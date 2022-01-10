import type { ApplicationEvent } from '../../../domain/events/GameEvent'
import type{ EventGateway } from '../../../domain/ports/EventGateway'
import { EventBus } from './EventBus'

export class InMemoryProductionEventGateway extends EventBus implements EventGateway {
    sendEvent (event: ApplicationEvent): Promise<void> {
        console.log('NEW EVENT', event)
        return this.onEvent(event)
    }
}
