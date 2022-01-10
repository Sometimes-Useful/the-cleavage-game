import { ConnectChatEvent } from './ConnectChatEvent'
import { ChatStatus } from '../../entities/ChatStatus'
import { alreadyConnectedToChatNotification } from '../../entities/notification/notifications'
import { Gherkin } from '../../tests/Gherkin'
import { theChatGatewayHasExpectedStatus, whenEventOccurs, theInterfaceGatewayHasNotifications, theInterfaceGatewayHasCurrentView } from '../../tests/unitTests'
import { feature, scenario } from '../../tests/testSuites'
import { channel, token, username } from '../../tests/testContexts'
import { InterfaceView } from '../../entities/InterfaceView'

feature(new ConnectChatEvent(username, token, channel), [
    scenario('Scenario 1 : Connect Chat on chat DISCONNECTED', [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.CONNECT_CHAT),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application.gateways.chat, ChatStatus.DISCONNECTED),
        application => whenEventOccurs(application.gateways.event, new ConnectChatEvent(username, token, channel)),
        application => theChatGatewayHasExpectedStatus(Gherkin.THEN, application.gateways.chat, ChatStatus.CONNECTED),
        application => theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, application.gateways.interface, InterfaceView.NEW_CLEAVAGE)
    ]),
    scenario("Scenario 2 : Can't Connect Chat on chat already CONNECTED", [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.CONNECT_CHAT),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application.gateways.chat, ChatStatus.CONNECTED),
        application => whenEventOccurs(application.gateways.event, new ConnectChatEvent(username, token, channel)),
        application => theChatGatewayHasExpectedStatus(Gherkin.THEN, application.gateways.chat, ChatStatus.CONNECTED),
        application => theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, application.gateways.interface, InterfaceView.CONNECT_CHAT),
        application => theInterfaceGatewayHasNotifications(Gherkin.AND_THEN, application.gateways.interface, alreadyConnectedToChatNotification)
    ])
])
