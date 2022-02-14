import type { ApplicationEvent } from '../../../domain/events/GameEvent'
import type { EventGatewaySecondary } from '../../../domain/ports/secondary/gateways/EventGatewaySecondary'
import { ServerEventBus } from './ServerEventBus'

export class FakeServerEventGateway extends ServerEventBus implements EventGatewaySecondary {
    sendEvent (event: ApplicationEvent): Promise<void> {
        this.events.push(event)
        return Promise.resolve()
    }

    public events: ApplicationEvent[] = [];
}
