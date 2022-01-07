import { ApplicationEvent } from '../events/GameEvent'

export interface EventGateway {
    sendEvent(event:ApplicationEvent): Promise<void>;
}
