import type { ApplicationEvent } from '../../../domain/events/GameEvent'
import type { EventGateway } from '../../../domain/ports/EventGateway'
import { EventBus } from './EventBus'

export class FakeEventGateway extends EventBus implements EventGateway {
    sendEvent (event: ApplicationEvent): Promise<void> {
        this.events.push(event)
        return Promise.resolve()
    }

    public events: ApplicationEvent[] = [];
}
