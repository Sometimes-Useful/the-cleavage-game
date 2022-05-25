import { ConnectChatEvent } from './ConnectChatEvent'
import { ChatStatus } from '../../entities/ChatStatus'
import { alreadyConnectedToChatNotification } from '../../entities/notification/notifications'
import { Gherkin } from '../../tests/Gherkin'

import { theInterfaceGatewayDontPlayMusic, theInterfaceGatewayHasNotifications, theInterfaceGatewayHasPlayingMusic } from '../../tests/unitTests/interfaceGateway'
import { theChatGatewayHasExpectedStatus, theChatGatewaySendMessage } from '../../tests/unitTests/chatGateway'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { channel, token, username } from '../../tests/testContexts'
import { mainMusic } from '../../entities/music/mainMusic'
import { EventType } from '../EventType'
import { WelcomeMessage } from '../../entities/message'
import { whenEventOccurs, theEventIsSent } from '../../tests/unitTests/eventGateway'
import { CreateBarEvent } from '../createBar/CreateBarEvent'
feature(EventType.CONNECT_CHAT, [
    clientScenario('Scenario 1 : Connect Chat on chat DISCONNECTED', [
        theInterfaceGatewayDontPlayMusic(Gherkin.GIVEN),
        theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, ChatStatus.DISCONNECTED),
        whenEventOccurs(new ConnectChatEvent(username, token, channel)),
        theChatGatewayHasExpectedStatus(Gherkin.THEN, ChatStatus.CONNECTED),
        theEventIsSent(Gherkin.AND_THEN, new CreateBarEvent()),
        theChatGatewaySendMessage(Gherkin.THEN, new WelcomeMessage()),
        theInterfaceGatewayHasPlayingMusic(Gherkin.AND_THEN, mainMusic)
    ]),
    clientScenario("Scenario 2 : Can't Connect Chat on chat already CONNECTED", [
        theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, ChatStatus.CONNECTED),
        whenEventOccurs(new ConnectChatEvent(username, token, channel)),
        theChatGatewayHasExpectedStatus(Gherkin.THEN, ChatStatus.CONNECTED),
        theInterfaceGatewayHasNotifications(Gherkin.AND_THEN, alreadyConnectedToChatNotification)
    ])
])
