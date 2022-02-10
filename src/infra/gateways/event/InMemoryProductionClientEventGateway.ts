import type { ApplicationEvent } from '../../../domain/events/GameEvent'
import type { EventGatewaySecondary } from '../../../domain/ports/secondary/gateways/EventGatewaySecondary'
import { ClientEventBus } from './ClientEventBus'

export class InMemoryProductionClientEventGateway extends ClientEventBus implements EventGatewaySecondary {
    sendEvent (event: ApplicationEvent): Promise<void> {
        console.log('NEW EVENT', event)
        return this.onEvent(event)
    }
}
