import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class HelpEnabledEvent extends ApplicationEvent {
    eventType: EventType = EventType.HELP_ENABLED
}
