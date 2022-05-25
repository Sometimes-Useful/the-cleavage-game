
import { theInterfaceGatewayHasNotifications } from '../../tests/unitTests/interfaceGateway'
import { theChatGatewayHasExpectedStatus } from '../../tests/unitTests/chatGateway'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { ChatStatus } from '../../entities/ChatStatus'
import { alreadyDisconnectedToChatNotification } from '../../entities/notification/notifications'
import { DisconnectChatEvent } from './DisconnectChatEvent'
import { EventType } from '../EventType'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'

feature(EventType.DISCONNECT_CHAT, [
    clientScenario('Scenario 1 : Connect Chat on chat DISCONNECTED', [
        theChatGatewayHasExpectedStatus(Gherkin.GIVEN, ChatStatus.CONNECTED),
        whenEventOccurs(new DisconnectChatEvent()),
        theChatGatewayHasExpectedStatus(Gherkin.THEN, ChatStatus.DISCONNECTED)
    ]),
    clientScenario("Scenario 2 : Can't Connect Chat on chat already CONNECTED", [
        theChatGatewayHasExpectedStatus(Gherkin.GIVEN, ChatStatus.DISCONNECTED),
        whenEventOccurs(new DisconnectChatEvent()),
        theChatGatewayHasExpectedStatus(Gherkin.THEN, ChatStatus.DISCONNECTED),
        theInterfaceGatewayHasNotifications(Gherkin.AND_THEN, alreadyDisconnectedToChatNotification)
    ])
])
