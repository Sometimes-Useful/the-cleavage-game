import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class InstallNewStoolsOnBarEvent extends ApplicationEvent {
    eventType: EventType = EventType.INSTALL_NEW_STOOLS_ON_BAR;
}
