import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class VideoExtractStartEvent extends ApplicationEvent {
    eventType: EventType = EventType.VIDEO_EXTRACT_START;
}
