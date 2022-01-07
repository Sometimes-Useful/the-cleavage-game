import { ApplicationEvent } from "../events/GameEvent";
import { EventGateway } from "../ports/EventGateway";

export class EventApplicationService {
    constructor(private eventGateway:EventGateway){}
    sentEvent(event:ApplicationEvent): Promise<void> {
        return this.eventGateway.sendEvent(event)
    }
}
