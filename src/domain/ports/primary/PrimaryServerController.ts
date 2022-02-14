import { EventType } from '../../events/EventType'
import type { ApplicationEvent } from '../../events/GameEvent'
import { eventNotSupported } from '../../messages/messages'
import type { UseCase } from '../../usecases/UseCase'
import type { ServerApplicationServices } from '../ApplicationServices'
import { SaveGlobalCleavageDrawPileUseCase } from '../../usecases/SaveGlobalCleavageDrawPileUseCase'

export class PrimaryServerCommandController {
    constructor (applicationServices: ServerApplicationServices) {
        this.useCases.set(EventType.SAVE_CLEAVAGE_ON_GLOBAL_CLEAVAGE_DRAWPILE, new SaveGlobalCleavageDrawPileUseCase(applicationServices))
    }

    executeEvent (event: ApplicationEvent): Promise<void> {
        const usecase = this.useCases.get(event.eventType)
        return usecase
            ? usecase.execute(event)
            : Promise.reject(new Error(eventNotSupported(event, this)))
    }

    private useCases: Map<EventType, UseCase> = new Map([]);
}
