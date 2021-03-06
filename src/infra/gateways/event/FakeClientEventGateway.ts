import type { ApplicationEvent } from '../../../domain/events/GameEvent'
import type { EventGatewaySecondary } from '../../../domain/ports/secondary/gateways/EventGatewaySecondary'
import { ClientEventBus } from './ClientEventBus'

export class FakeClientEventGateway extends ClientEventBus implements EventGatewaySecondary {
    sendEvents (events: ApplicationEvent[]): Promise<void> {
        /*
        const sendNextEvent = ():Promise<void> => {
            const event = events.shift()
            return event
                ? this.sendEvent(event)
                    .then(() => sendNextEvent())
                    .catch(error => Promise.reject(error))
                : Promise.resolve()
        }
        return sendNextEvent()
        */

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
