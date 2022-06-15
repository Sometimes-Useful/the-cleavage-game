import type { FakeChatGateway } from '../../../../infra/gateways/chat/FakeChatGateway'
import type { TwitchChatGateway } from '../../../../infra/gateways/chat/TwitchChatGateway'
import type { FakeDateGateway } from '../../../../infra/gateways/date/FakeDateGateway'
import type { ProductionDateGateway } from '../../../../infra/gateways/date/ProductionDateGateway'
import type { FakeClientEventGateway } from '../../../../infra/gateways/event/FakeClientEventGateway'
import type { FakeServerEventGateway } from '../../../../infra/gateways/event/FakeServerEventGateway'
import type { InMemoryProductionClientEventGateway } from '../../../../infra/gateways/event/InMemoryProductionClientEventGateway'
import type { InMemoryProductionServerEventGateway } from '../../../../infra/gateways/event/InMemoryProductionServerEventGateway'
import type { FakeGlobalCleavageDrawPileGateway } from '../../../../infra/gateways/globalCleavageDrawPile/FakeGlobalCleavageDrawPileGateway'
import type { FakeInterfaceGateway } from '../../../../infra/gateways/interface/FakeInterfaceGateway'
import type { SvelteTonePixiInterfaceGateway } from '../../../../infra/gateways/interface/SvelteTonePixiInterfaceGateway'
import type { FakeRandomGateway } from '../../../../infra/gateways/random/FakeRandomGateway'
import type { ProductionRandomGateway } from '../../../../infra/gateways/random/ProductionRandomGateway'
import type { FakeStreamersGateway } from '../../../../infra/gateways/streamers/FakeStreamersGateway'
import type { FakeUuidGateway } from '../../../../infra/gateways/uuid/FakeUuidGateway'
import type { ChatGateway } from './ChatGateway'
import type { DateGateway } from './DateGateway'
import type { EventGatewaySecondary } from './EventGatewaySecondary'
import type { GlobalCleavageDrawPileGateway } from './GlobalCleavageDrawPileGateway'
import type { InterfaceGateway } from './InterfaceGateway'
import type { RandomGateway } from './RandomGateway'
import type { StreamersGateway } from './StreamersGateway'
import type { UuidGateway } from './UuidGateway'

export interface ClientApplicationGateways {
    streamers: StreamersGateway
    uuid:UuidGateway
    globalCleavageDrawPile:GlobalCleavageDrawPileGateway;
    date: DateGateway;
    chat: ChatGateway;
    event: EventGatewaySecondary;
    interface: InterfaceGateway;
    random:RandomGateway
}

export interface FakeClientApplicationGateways extends ClientApplicationGateways {
    streamers: FakeStreamersGateway
    uuid: FakeUuidGateway
    globalCleavageDrawPile: FakeGlobalCleavageDrawPileGateway
    date: FakeDateGateway;
    random: FakeRandomGateway;
    chat: FakeChatGateway;
    event: FakeClientEventGateway;
    interface: FakeInterfaceGateway;
}

export interface ProductionClientApplicationGateways extends ClientApplicationGateways {
    streamers: StreamersGateway
    globalCleavageDrawPile:GlobalCleavageDrawPileGateway;
    date: ProductionDateGateway
    random: ProductionRandomGateway
    chat: TwitchChatGateway;
    event: InMemoryProductionClientEventGateway;
    interface: SvelteTonePixiInterfaceGateway;
}

export interface ServerApplicationGateways {
    event: InMemoryProductionServerEventGateway
    random: RandomGateway
}
export interface FakeServerApplicationGateways extends ServerApplicationGateways {
    event: FakeServerEventGateway
    random: FakeRandomGateway
}

export interface ProductionServerApplicationGateways extends ServerApplicationGateways {
    event: InMemoryProductionServerEventGateway
    random: ProductionRandomGateway
}
