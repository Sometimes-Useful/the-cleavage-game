import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class VideoExtractStopEvent extends ApplicationEvent {
    eventType: EventType = EventType.VIDEO_EXTRACT_STOP;
}
