import { ApplicationEvent } from '../GameEvent';
import { EventType } from '../EventType';

export class LaunchCleavageEvent extends ApplicationEvent {
    constructor(public cleavageTitle: string) {
        super();
    }
    eventType: EventType = EventType.LAUNCH_CLEAVAGE;
}
