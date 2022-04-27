import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class ChangeVideoExtractVolumeEvent extends ApplicationEvent {
    constructor (
        public volume:number
    ) { super() }

    eventType: EventType = EventType.CHANGE_VIDEO_EXTRACT_VOLUME
}
