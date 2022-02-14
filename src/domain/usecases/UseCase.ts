import type { ApplicationEvent } from '../events/GameEvent'

export abstract class UseCase {
    abstract execute(event: ApplicationEvent): Promise<void>;
}

export abstract class QueryUseCase {
    abstract execute<T, E extends ApplicationEvent>(event: E): Promise<T>;
}
