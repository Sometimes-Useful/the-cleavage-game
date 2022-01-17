import type { InterfaceView } from '../../entities/InterfaceView'
import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class NavigateEvent extends ApplicationEvent {
    constructor (
        public targetView:InterfaceView
    ) { super() }

    eventType: EventType = EventType.NAVIGATE
}
