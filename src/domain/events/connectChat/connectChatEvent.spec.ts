import { ConnectChatEvent } from './ConnectChatEvent'
import { ChatStatus } from '../../ports/ChatGateway'
import { alreadyConnectedToChatNotification } from '../../entities/notification/notifications'
import { Gherkin } from '../../tests/Gherkin'
import { theChatGatewayHasExpectedStatus, whenEventOccurs, theNotificationGatewayHasNotifications } from '../../tests/unitTests'
import { feature, scenario } from '../../tests/testSuites'


feature(new ConnectChatEvent(),[
    scenario("Scenario 1 : Connect Chat on chat DISCONNECTED", [
        application => theChatGatewayHasExpectedStatus(Gherkin.GIVEN, application.gateways.chat, ChatStatus.DISCONNECTED),
        application => whenEventOccurs(application.gateways.event, new ConnectChatEvent()),
        application => theChatGatewayHasExpectedStatus(Gherkin.THEN, application.gateways.chat, ChatStatus.CONNECTED)
    ]),
    scenario("Scenario 2 : Can't Connect Chat on chat already CONNECTED", [
        application => theChatGatewayHasExpectedStatus(Gherkin.GIVEN, application.gateways.chat, ChatStatus.CONNECTED),
        application => whenEventOccurs(application.gateways.event, new ConnectChatEvent()),
        application => theChatGatewayHasExpectedStatus(Gherkin.THEN, application.gateways.chat, ChatStatus.CONNECTED),
        application => theNotificationGatewayHasNotifications(Gherkin.AND_THEN, application.gateways.notification, alreadyConnectedToChatNotification)
    ])
])



