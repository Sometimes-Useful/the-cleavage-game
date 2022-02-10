import type { ApplicationEvent } from '../../../domain/events/GameEvent'
import type { EventGatewayPrimary } from '../../../domain/ports/primary/EventGatewayPrimary'
import type { PrimaryServerCommandController } from '../../../domain/ports/primary/PrimaryServerController'

export abstract class ServerEventBus implements EventGatewayPrimary {
    onEvent (event: ApplicationEvent): Promise<void> {
        return this.controller
            ? this.controller.executeEvent(event)
            : Promise.reject(new Error('Controller not configured.'))
    }

    configureController (commandController: PrimaryServerCommandController): void {
        this.controller = commandController
    }

    private controller?: PrimaryServerCommandController;
}
