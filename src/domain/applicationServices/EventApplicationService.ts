import type { ApplicationEvent } from '../events/GameEvent'
import type { EventGatewaySecondary } from '../ports/secondary/gateways/EventGatewaySecondary'

export class EventApplicationService {
    constructor (private eventGateway:EventGatewaySecondary) {}
    sentEvent (event:ApplicationEvent): Promise<void> {
        return this.eventGateway.sendEvent(event)
    }
}
