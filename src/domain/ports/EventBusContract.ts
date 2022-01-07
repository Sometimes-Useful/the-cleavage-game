import { ApplicationEvent } from '../events/GameEvent';
import { ApplicationServices } from './ApplicationServices';

export interface EventBusContract {
    onEvent(event: ApplicationEvent): Promise<void>;
    configureController(applicationServices: ApplicationServices): void;
}
