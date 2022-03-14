import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class PlayerQuitEvent extends ApplicationEvent {
    constructor (
        public username:string
    ) { super() }

    eventType: EventType = EventType.PLAYER_QUIT
}
