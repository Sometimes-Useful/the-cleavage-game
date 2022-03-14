import type { InterfaceEntityState } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class DrawEvent extends ApplicationEvent {
    constructor (
        public id:string,
        public interfaceEntityState:InterfaceEntityState | undefined
    ) { super() }

    eventType: EventType = EventType.DRAW;
}
