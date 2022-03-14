import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'
import type { Position } from '../../entities/Position'

export class PlayerMoveEvent extends ApplicationEvent {
    constructor (public username: string, public position:Position) { super() }
    eventType: EventType = EventType.PLAYER_MOVE;
}
