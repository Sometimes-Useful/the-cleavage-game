import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class InstallNewStoolsOnTableEvent extends ApplicationEvent {
    constructor (public tableId: string) { super() }
    eventType: EventType = EventType.INSTALL_NEW_STOOLS_ON_TABLE;
}
