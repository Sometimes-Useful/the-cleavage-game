import type { ApplicationEvent } from '../../../domain/events/GameEvent'
import type { EventGatewaySecondary } from '../../../domain/ports/secondary/gateways/EventGatewaySecondary'
import { ServerEventBus } from './ServerEventBus'

export class FakeServerEventGateway extends ServerEventBus implements EventGatewaySecondary {
    sendEvents (events: ApplicationEvent[]): Promise<void> {
        return Promise.all(events.map(event => this.sendEvent(event)))
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    sendEvent (event: ApplicationEvent): Promise<void> {
        this.events.push(event)
        return Promise.resolve()
    }

    public events: ApplicationEvent[] = [];
}
