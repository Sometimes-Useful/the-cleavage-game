import { ApplicationEvent } from '../GameEvent'
import { EventType } from '../EventType'

export class PlayerWhistleEvent extends ApplicationEvent {
    eventType: EventType = EventType.PLAYER_WHISTLE;
}
