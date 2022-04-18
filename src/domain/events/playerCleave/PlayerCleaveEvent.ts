import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'
import type { PlayerCleave } from '../../entities/PlayerCleave'

export class PlayerCleaveEvent extends ApplicationEvent {
    constructor (public username:string, public playerCleave: PlayerCleave) {
        super()
    }

    eventType: EventType = EventType.PLAYER_CLEAVE;
}
