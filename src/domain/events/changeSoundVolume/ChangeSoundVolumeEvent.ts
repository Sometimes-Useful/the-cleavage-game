import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class ChangeSoundVolumeEvent extends ApplicationEvent {
    constructor (
        public volume: number
    ) { super() }

    eventType: EventType = EventType.CHANGE_SOUND_VOLUME;
}
