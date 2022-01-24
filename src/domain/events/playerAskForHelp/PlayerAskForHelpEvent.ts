import { ApplicationEvent } from '../GameEvent'
import { EventType } from '../EventType'
import type { Player } from '../../entities/Player'

export class PlayerAskForHelpEvent extends ApplicationEvent {
    constructor (
        public player:Player
    ) { super() }

    eventType: EventType = EventType.PLAYER_ASK_FOR_HELP;
}
