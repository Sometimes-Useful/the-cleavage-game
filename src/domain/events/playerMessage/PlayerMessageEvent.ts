import { EventType } from "../EventType";
import { ApplicationEvent } from "../GameEvent";

export class PlayerMessageEvent extends ApplicationEvent {
    constructor(
        public message: string,
        public player: string
    ) { super(); }
    eventType: EventType = EventType.PLAYER_MESSAGE;
}
