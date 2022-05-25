import type { ApplicationEvent } from '../../../events/GameEvent'

export interface EventGatewaySecondary {
    sendEvent(event: ApplicationEvent): Promise<void>;
    sendEvents(events:ApplicationEvent[]): Promise<void>
}
