import { ApplicationEvent } from '../GameEvent'
import { EventType } from '../EventType'

export class PlayerHyperLikeEvent extends ApplicationEvent {
    eventType: EventType = EventType.PLAYER_HYPERLIKE;
}
