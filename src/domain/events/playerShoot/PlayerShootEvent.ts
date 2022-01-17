import { ApplicationEvent } from '../GameEvent'
import { EventType } from '../EventType'

export class PlayerShootEvent extends ApplicationEvent {
    eventType: EventType = EventType.PLAYER_SHOOT;
}
