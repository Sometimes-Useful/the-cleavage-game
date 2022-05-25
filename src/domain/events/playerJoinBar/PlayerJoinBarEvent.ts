import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class PlayerJoinBarEvent extends ApplicationEvent {
    constructor (public username: string) { super() }
    eventType: EventType = EventType.PLAYER_JOIN_BAR;
}
