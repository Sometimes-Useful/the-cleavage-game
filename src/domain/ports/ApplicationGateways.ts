import type { ChatGateway } from './ChatGateway'
import type { EventGateway } from './EventGateway'
import type { InterfaceGateway } from './InterfaceGateway'
import type { FakeChatGateway } from '../../infra/gateways/chat/FakeChatGateway'
import type { FakeInterfaceGateway } from '../../infra/gateways/interface/FakeInterfaceGateway'
import type { FakeEventGateway } from '../../infra/gateways/event/FakeEventGateway'
import type { TwitchChatGateway } from '../../infra/gateways/chat/TwitchChatGateway'
import type { SvelteInterfaceGateway } from '../../infra/gateways/interface/SvelteInterfaceGateway'
import type { InMemoryProductionEventGateway } from '../../infra/gateways/event/InMemoryProductionEventGateway'

export interface ApplicationGateways {
    chat: ChatGateway;
    event: EventGateway;
    interface: InterfaceGateway;
}

export interface FakeApplicationGateways extends ApplicationGateways {
    chat: FakeChatGateway;
    event: FakeEventGateway;
    interface: FakeInterfaceGateway;
}

export interface ProductionApplicationGateways extends ApplicationGateways {
    chat: TwitchChatGateway;
    event: InMemoryProductionEventGateway;
    interface: SvelteInterfaceGateway;
}
