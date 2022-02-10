import type { ApplicationEvent } from '../../../domain/events/GameEvent'
import type { EventGatewaySecondary } from '../../../domain/ports/secondary/gateways/EventGatewaySecondary'
import { ServerEventBus } from './ServerEventBus'

export class InMemoryProductionServerEventGateway extends ServerEventBus implements EventGatewaySecondary {
    sendEvent (event: ApplicationEvent): Promise<void> {
        console.log('SERVER NEW EVENT', event)
        return this.onEvent(event)
    }
}
