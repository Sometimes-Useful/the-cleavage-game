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
        app => theInterfaceGatewayDontPlayMusic(Gherkin.GIVEN, app),
        app => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, app, ChatStatus.DISCONNECTED),
        app => whenEventOccurs(app, new ConnectChatEvent(username, token, channel)),
        app => theChatGatewayHasExpectedStatus(Gherkin.THEN, app, ChatStatus.CONNECTED),
        app => theEventIsSent(Gherkin.AND_THEN, app, new CreateBarEvent()),
        app => theChatGatewaySendMessage(Gherkin.THEN, app, new WelcomeMessage()),
        app => theInterfaceGatewayHasPlayingMusic(Gherkin.AND_THEN, app, mainMusic)
    ]),
    clientScenario("Scenario 2 : Can't Connect Chat on chat already CONNECTED", [
        app => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, app, ChatStatus.CONNECTED),
        app => whenEventOccurs(app, new ConnectChatEvent(username, token, channel)),
        app => theChatGatewayHasExpectedStatus(Gherkin.THEN, app, ChatStatus.CONNECTED),
        app => theInterfaceGatewayHasNotifications(Gherkin.AND_THEN, app, alreadyConnectedToChatNotification)
    ])
])
