import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

type VideoExtractStartEventProperties = {
    fullRandom:boolean
}

export class VideoExtractStartEvent extends ApplicationEvent {
    constructor (
        public properties:VideoExtractStartEventProperties
    ) { super() }

    eventType: EventType = EventType.VIDEO_EXTRACT_START;
}
