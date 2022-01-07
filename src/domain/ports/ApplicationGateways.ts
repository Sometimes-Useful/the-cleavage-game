import { ChatGateway } from './ChatGateway';
import { EventGateway } from './EventGateway';
import { NotificationGateway } from './NotificationGateway';
import { InterfaceGateway } from './InterfaceGateway';
import { FakeChatGateway } from '../../infra/gateways/chat/FakeChatGateway';
import { FakeInterfaceGateway } from '../../infra/gateways/interface/FakeInterfaceGateway';
import { FakeNotificationGateway } from '../../infra/gateways/notification/FakeNotificationGateway';
import { FakeEventGateway } from "../../infra/gateways/event/FakeEventGateway";
import { TwitchChatGateway } from '../../infra/gateways/chat/TwitchChatGateway';
import { SvelteInterfaceGateway } from '../../infra/gateways/interface/SvelteInterfaceGateway';
import { SvelteNotificationGateway } from '../../infra/gateways/notification/SvelteNotificationGateway';
import { InMemoryProductionEventGateway } from '../../infra/gateways/event/InMemoryProductionEventGateway';

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
