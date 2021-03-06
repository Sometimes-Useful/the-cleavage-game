import { ApplicationEvent } from '../GameEvent'
import { EventType } from '../EventType'

export class PlayerAskForHelpEvent extends ApplicationEvent {
    constructor (
        public username:string
    ) { super() }

    eventType: EventType = EventType.PLAYER_ASK_FOR_HELP;
}
