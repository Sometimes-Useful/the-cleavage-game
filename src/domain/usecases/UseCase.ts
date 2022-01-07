import type { ApplicationEvent } from '../events/GameEvent'

export abstract class UseCase {
    abstract execute(event: ApplicationEvent): Promise<void>;
}
