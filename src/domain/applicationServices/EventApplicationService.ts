import type { ApplicationEvent } from '../events/GameEvent'
import type { EventGatewaySecondary } from '../ports/secondary/gateways/EventGatewaySecondary'

export class EventApplicationService {
    constructor (private eventGateway:EventGatewaySecondary) {}
    sentEvent (event:ApplicationEvent): Promise<void> {
        return this.eventGateway.sendEvent(event)
    }

    sentEvents (events: ApplicationEvent[]): Promise<void> {
        return Promise.all(events.map(event => this.sentEvent(event)))
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }
}
