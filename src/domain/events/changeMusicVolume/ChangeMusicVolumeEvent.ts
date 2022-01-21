import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class ChangeMusicVolumeEvent extends ApplicationEvent {
    constructor (
        public volume:number
    ) { super() }

    eventType: EventType = EventType.CHANGE_MUSIC_VOLUME
}
