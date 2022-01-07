import { ApplicationEvent } from '../../../domain/events/GameEvent'
import { EventGateway } from '../../../domain/ports/EventGateway'
import { EventBus } from './EventBus'

export class InMemoryProductionEventGateway extends EventBus implements EventGateway {
    sendEvent (event: ApplicationEvent): Promise<void> {
        return this.onEvent(event)
    }
}
