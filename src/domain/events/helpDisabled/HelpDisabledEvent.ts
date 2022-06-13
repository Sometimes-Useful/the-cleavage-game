import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class HelpDisabledEvent extends ApplicationEvent {
    eventType: EventType = EventType.HELP_DISABLED
}
