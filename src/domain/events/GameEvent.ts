import type { EventType } from './EventType'

export abstract class ApplicationEvent {
    abstract eventType: EventType;
}
