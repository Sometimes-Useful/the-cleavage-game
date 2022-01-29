import type { ApplicationEvent } from '../../events/GameEvent'
import type { ApplicationServices } from '../ApplicationServices'

export interface EventGatewayPrimary {
    onEvent(event: ApplicationEvent): Promise<void>;
    configureController(applicationServices: ApplicationServices): void;
}
