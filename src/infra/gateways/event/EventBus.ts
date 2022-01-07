import { ApplicationEvent } from '../../../domain/events/GameEvent';
import { ApplicationServices } from '../../../domain/ports/ApplicationServices';
import { EventBusContract } from "../../../domain/ports/EventBusContract";
import { PrimaryController } from '../../../domain/usecases/PrimaryController';

export abstract class EventBus implements EventBusContract {
    onEvent(event: ApplicationEvent): Promise<void> {
        return this.controller
            ? this.controller.executeEvent(event)
            : Promise.reject(new Error("Controller not configured."));
    }
    configureController(applicationServices: ApplicationServices): void {
        this.controller = new PrimaryController(applicationServices);
    }
    private controller?: PrimaryController;
}
