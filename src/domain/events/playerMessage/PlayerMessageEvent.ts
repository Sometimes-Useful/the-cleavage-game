import { ApplicationEvent } from '../GameEvent'
import { EventType } from '../EventType'
import type { Player } from '../../entities/Player'

export class PlayerMessageEvent extends ApplicationEvent {
    eventType: EventType = EventType.PLAYER_MESSAGE;
    constructor (
        public player: Player,
        public message: string
    ) { super() }
}
