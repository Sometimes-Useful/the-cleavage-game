import type { FakeChatGateway } from '../../../../infra/gateways/chat/FakeChatGateway'
import type { TwitchChatGateway } from '../../../../infra/gateways/chat/TwitchChatGateway'
import type { FakeEventGateway } from '../../../../infra/gateways/event/FakeEventGateway'
import type { InMemoryProductionEventGateway } from '../../../../infra/gateways/event/InMemoryProductionEventGateway'
import type { FakeInterfaceGateway } from '../../../../infra/gateways/interface/FakeInterfaceGateway'
import type { SvelteAndToneInterfaceGateway } from '../../../../infra/gateways/interface/SvelteAndToneInterfaceGateway'
import type { FakeRandomGateway } from '../../../../infra/gateways/random/FakeRandomGateway'
import type { ProductionRandomGateway } from '../../../../infra/gateways/random/ProductionRandomGateway'
import type { ChatGateway } from './ChatGateway'
import type { EventGatewaySecondary } from './EventGatewaySecondary'
import type { InterfaceGateway } from './InterfaceGateway'
import type { RandomGateway } from './RandomGateway'

export interface ApplicationGateways {
    chat: ChatGateway;
    event: EventGatewaySecondary;
    interface: InterfaceGateway;
    random:RandomGateway
}

export interface FakeApplicationGateways extends ApplicationGateways {
    random: FakeRandomGateway;
    chat: FakeChatGateway;
    event: FakeEventGateway;
    interface: FakeInterfaceGateway;
}

export interface ProductionApplicationGateways extends ApplicationGateways {
    random: ProductionRandomGateway
    chat: TwitchChatGateway;
    event: InMemoryProductionEventGateway;
    interface: SvelteAndToneInterfaceGateway;
}
