import type { Cleavage } from '../../entities/Cleavage'
import type { ApplicationEvent } from '../../events/GameEvent'
import type { PrimaryClientController } from './PrimaryClientController'
import type { PrimaryServerCommandController } from './PrimaryServerController'

export interface EventGatewayPrimary {
    onEvent(event: ApplicationEvent): Promise<void|Cleavage|undefined>;
    configureController(controller: PrimaryClientController|PrimaryServerCommandController): void;
}
