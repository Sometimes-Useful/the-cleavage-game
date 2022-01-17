import { ApplicationEvent } from '../GameEvent'
import { EventType } from '../EventType'

export class PlayerApplauseEvent extends ApplicationEvent {
    eventType: EventType = EventType.PLAYER_APPLAUSE;
}
