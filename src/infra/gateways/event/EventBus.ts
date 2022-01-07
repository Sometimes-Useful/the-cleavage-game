import type { ApplicationEvent } from '../../../domain/events/GameEvent'
import type { ApplicationServices } from '../../../domain/ports/ApplicationServices'
import type { EventBusContract } from '../../../domain/ports/EventBusContract'
import { PrimaryController } from '../../../domain/usecases/PrimaryController'

export abstract class EventBus implements EventBusContract {
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
