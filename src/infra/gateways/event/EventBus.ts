import type { ApplicationEvent } from '../../../domain/events/GameEvent'
import type { ApplicationServices } from '../../../domain/ports/ApplicationServices'
import type { EventGatewayPrimary } from '../../../domain/ports/primary/EventGatewayPrimary'
import { PrimaryController } from '../../../domain/ports/primary/PrimaryController'

export abstract class EventBus implements EventGatewayPrimary {
    onEvent (event: ApplicationEvent): Promise<void> {
        return this.controller
            ? this.controller.executeEvent(event)
            : Promise.reject(new Error('Controller not configured.'))
    }

    configureController (applicationServices: ApplicationServices): void {
        this.controller = new PrimaryController(applicationServices)
    }

    private controller?: PrimaryController;
}
