
import { theInterfaceGatewayHasNotifications } from '../../tests/unitTests/interfaceGateway'
import { theChatGatewayHasExpectedStatus } from '../../tests/unitTests/chatGateway'
import { feature, scenario } from '../../tests/testSuites'
import { Gherkin } from '../../tests/Gherkin'
import { ChatStatus } from '../../entities/ChatStatus'
import { alreadyDisconnectedToChatNotification } from '../../entities/notification/notifications'
import { DisconnectChatEvent } from './DisconnectChatEvent'
import { EventType } from '../EventType'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'

feature(EventType.DISCONNECT_CHAT, [
    scenario('Scenario 1 : Connect Chat on chat DISCONNECTED', [
        application => theChatGatewayHasExpectedStatus(Gherkin.GIVEN, application, ChatStatus.CONNECTED),
        application => whenEventOccurs(application, new DisconnectChatEvent()),
        application => theChatGatewayHasExpectedStatus(Gherkin.THEN, application, ChatStatus.DISCONNECTED)
    ]),
    scenario("Scenario 2 : Can't Connect Chat on chat already CONNECTED", [
        application => theChatGatewayHasExpectedStatus(Gherkin.GIVEN, application, ChatStatus.DISCONNECTED),
        application => whenEventOccurs(application, new DisconnectChatEvent()),
        application => theChatGatewayHasExpectedStatus(Gherkin.THEN, application, ChatStatus.DISCONNECTED),
        application => theInterfaceGatewayHasNotifications(Gherkin.AND_THEN, application, alreadyDisconnectedToChatNotification)
    ])
])
