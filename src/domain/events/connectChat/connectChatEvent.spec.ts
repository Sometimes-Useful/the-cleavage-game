import { ConnectChatEvent } from './ConnectChatEvent'
import { ChatStatus } from '../../entities/ChatStatus'
import { alreadyConnectedToChatNotification } from '../../entities/notification/notifications'
import { Gherkin } from '../../tests/Gherkin'
import { theChatGatewayHasExpectedStatus, whenEventOccurs, theInterfaceGatewayHasNotifications, theInterfaceGatewayHasPlayingMusic, theInterfaceGatewayDontPlayMusic, theEventIsSent, theChatGatewaySendMessage } from '../../tests/unitTests'
import { feature, scenario } from '../../tests/testSuites'
import { channel, token, username } from '../../tests/testContexts'
import { InterfaceView } from '../../entities/InterfaceView'
import { mainMusic } from '../../entities/music/mainMusic'
import { EventType } from '../EventType'
import { NavigateEvent } from '../navigateEvent/NavigateEvent'
import { WelcomeMessage } from '../../entities/message'
feature(EventType.CONNECT_CHAT, [
    scenario('Scenario 1 : Connect Chat on chat DISCONNECTED', [
        application => theInterfaceGatewayDontPlayMusic(Gherkin.AND_THEN, application.gateways.interface),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application.gateways.chat, ChatStatus.DISCONNECTED),
        application => whenEventOccurs(application.gateways.event, new ConnectChatEvent(username, token, channel)),
        application => theChatGatewayHasExpectedStatus(Gherkin.THEN, application.gateways.chat, ChatStatus.CONNECTED),
        application => theEventIsSent(Gherkin.AND_THEN, application.gateways.event, new NavigateEvent(InterfaceView.NEW_CLEAVAGE)),
        application => theChatGatewaySendMessage(Gherkin.THEN, application.gateways.chat, new WelcomeMessage()),
        application => theInterfaceGatewayHasPlayingMusic(Gherkin.AND_THEN, application.gateways.interface, mainMusic)
    ]),
    scenario("Scenario 2 : Can't Connect Chat on chat already CONNECTED", [
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application.gateways.chat, ChatStatus.CONNECTED),
        application => whenEventOccurs(application.gateways.event, new ConnectChatEvent(username, token, channel)),
        application => theChatGatewayHasExpectedStatus(Gherkin.THEN, application.gateways.chat, ChatStatus.CONNECTED),
        application => theInterfaceGatewayHasNotifications(Gherkin.AND_THEN, application.gateways.interface, alreadyConnectedToChatNotification)
    ])
])
