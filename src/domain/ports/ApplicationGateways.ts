import type { ChatGateway } from './ChatGateway'
import type { EventGateway } from './EventGateway'
import type { NotificationGateway } from './NotificationGateway'
import type { InterfaceGateway } from './InterfaceGateway'
import type { FakeChatGateway } from '../../infra/gateways/chat/FakeChatGateway'
import type { FakeInterfaceGateway } from '../../infra/gateways/interface/FakeInterfaceGateway'
import type { FakeNotificationGateway } from '../../infra/gateways/notification/FakeNotificationGateway'
import type { FakeEventGateway } from '../../infra/gateways/event/FakeEventGateway'
import type { TwitchChatGateway } from '../../infra/gateways/chat/TwitchChatGateway'
import type { SvelteInterfaceGateway } from '../../infra/gateways/interface/SvelteInterfaceGateway'
import type { SvelteNotificationGateway } from '../../infra/gateways/notification/SvelteNotificationGateway'
import type { InMemoryProductionEventGateway } from '../../infra/gateways/event/InMemoryProductionEventGateway'

export interface ApplicationGateways {
    chat: ChatGateway;
    event: EventGateway;
    notification: NotificationGateway;
    interface: InterfaceGateway;
}

export interface FakeApplicationGateways extends ApplicationGateways {
    chat: FakeChatGateway;
    event: FakeEventGateway;
    notification: FakeNotificationGateway;
    interface: FakeInterfaceGateway;
}

export interface ProductionApplicationGateways extends ApplicationGateways {
    chat: TwitchChatGateway;
    event: InMemoryProductionEventGateway;
    notification: SvelteNotificationGateway;
    interface: SvelteInterfaceGateway;
}
