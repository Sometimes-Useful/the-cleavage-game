import type { ApplicationEvent } from '../../../domain/events/GameEvent'
import type { EventGatewaySecondary } from '../../../domain/ports/secondary/gateways/EventGatewaySecondary'
import { ClientEventBus } from './ClientEventBus'

export class InMemoryProductionClientEventGateway extends ClientEventBus implements EventGatewaySecondary {
    sendEvents (events: ApplicationEvent[]): Promise<void> {
        return Promise.all(events.map(event => this.sendEvent(event)))
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    sendEvent (event: ApplicationEvent): Promise<void> {
        console.log('NEW EVENT', event)
        return this.onEvent(event)
    }
}
