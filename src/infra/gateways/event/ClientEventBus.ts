import type { ApplicationEvent } from '../../../domain/events/GameEvent'
import type { EventGatewayPrimary } from '../../../domain/ports/primary/EventGatewayPrimary'
import type { PrimaryClientController } from '../../../domain/ports/primary/PrimaryClientController'

export abstract class ClientEventBus implements EventGatewayPrimary {
    onEvent (event: ApplicationEvent): Promise<void> {
        return this.controller
            ? this.controller.executeEvent(event)
            : Promise.reject(new Error('Controller not configured.'))
    }

    configureController (controller: PrimaryClientController): void {
        this.controller = controller
    }

    private controller?: PrimaryClientController;
}
