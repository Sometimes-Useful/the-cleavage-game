import { theChatGatewayHasExpectedStatus, theNotificationGatewayHasNotifications, whenEventOccurs } from '../../tests/unitTests'
import { feature, scenario } from '../../tests/testSuites'
import { Gherkin } from '../../tests/Gherkin'
import { ChatStatus } from '../../ports/ChatGateway'
import { alreadyDisconnectedToChatNotification } from '../../entities/notification/notifications'
import { DisconnectChatEvent } from './DisconnectChatEvent'



feature(new DisconnectChatEvent(),[
    scenario("Scenario 1 : Connect Chat on chat DISCONNECTED", [
        application => theChatGatewayHasExpectedStatus(Gherkin.GIVEN, application.gateways.chat, ChatStatus.CONNECTED),
        application => whenEventOccurs(application.gateways.event, new DisconnectChatEvent()),
        application => theChatGatewayHasExpectedStatus(Gherkin.THEN, application.gateways.chat, ChatStatus.DISCONNECTED),
    ]),
    scenario("Scenario 2 : Can't Connect Chat on chat already CONNECTED", [
        application => theChatGatewayHasExpectedStatus(Gherkin.GIVEN, application.gateways.chat, ChatStatus.DISCONNECTED),
        application => whenEventOccurs(application.gateways.event, new DisconnectChatEvent()),
        application => theChatGatewayHasExpectedStatus(Gherkin.THEN, application.gateways.chat, ChatStatus.DISCONNECTED),
        application => theNotificationGatewayHasNotifications(Gherkin.AND_THEN, application.gateways.notification, alreadyDisconnectedToChatNotification)
    ])
])
