import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class InstallNewTableEvent extends ApplicationEvent {
    eventType: EventType = EventType.INSTALL_NEW_TABLE;
}
