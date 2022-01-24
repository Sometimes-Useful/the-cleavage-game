
import type { Player } from '../../entities/Player'
import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class PlayerJoinEvent extends ApplicationEvent {
    constructor (
        public player:Player
    ) { super() }

    eventType: EventType = EventType.PLAYER_JOIN
}
