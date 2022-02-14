import { ConnectChatEvent } from './ConnectChatEvent'
import { ChatStatus } from '../../entities/ChatStatus'
import { alreadyConnectedToChatNotification } from '../../entities/notification/notifications'
import { Gherkin } from '../../tests/Gherkin'

import { theInterfaceGatewayDontPlayMusic, theInterfaceGatewayHasNotifications, theInterfaceGatewayHasPlayingMusic } from '../../tests/unitTests/interfaceGateway'
import { theChatGatewayHasExpectedStatus, theChatGatewaySendMessage } from '../../tests/unitTests/chatGateway'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { channel, token, username } from '../../tests/testContexts'
import { InterfaceView } from '../../entities/InterfaceView'
import { mainMusic } from '../../entities/music/mainMusic'
import { EventType } from '../EventType'
import { NavigateEvent } from '../navigateEvent/NavigateEvent'
import { WelcomeMessage } from '../../entities/message'
import { whenEventOccurs, theEventIsSent } from '../../tests/unitTests/eventGateway'
feature(EventType.CONNECT_CHAT, [
    clientScenario('Scenario 1 : Connect Chat on chat DISCONNECTED', [
        application => theInterfaceGatewayDontPlayMusic(Gherkin.AND_THEN, application),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application, ChatStatus.DISCONNECTED),
        application => whenEventOccurs(application, new ConnectChatEvent(username, token, channel)),
        application => theChatGatewayHasExpectedStatus(Gherkin.THEN, application, ChatStatus.CONNECTED),
        application => theEventIsSent(Gherkin.AND_THEN, application, new NavigateEvent(InterfaceView.NEW_CLEAVAGE)),
        application => theChatGatewaySendMessage(Gherkin.THEN, application, new WelcomeMessage()),
        application => theInterfaceGatewayHasPlayingMusic(Gherkin.AND_THEN, application, mainMusic)
    ]),
    clientScenario("Scenario 2 : Can't Connect Chat on chat already CONNECTED", [
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application, ChatStatus.CONNECTED),
        application => whenEventOccurs(application, new ConnectChatEvent(username, token, channel)),
        application => theChatGatewayHasExpectedStatus(Gherkin.THEN, application, ChatStatus.CONNECTED),
        application => theInterfaceGatewayHasNotifications(Gherkin.AND_THEN, application, alreadyConnectedToChatNotification)
    ])
])
