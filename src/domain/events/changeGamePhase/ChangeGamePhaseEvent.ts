import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'
import type { GamePhase } from '../../entities/GamePhase'

export class ChangeGamePhaseEvent extends ApplicationEvent {
    constructor (public gamePhase: GamePhase) { super() }
    eventType: EventType = EventType.CHANGE_GAME_PHASE;
}
