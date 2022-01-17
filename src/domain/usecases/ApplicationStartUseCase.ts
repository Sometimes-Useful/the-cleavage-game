import { UseCase } from './UseCase'
import type { ApplicationEvent } from '../events/GameEvent'
import { InterfaceView } from '../entities/InterfaceView'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import { NavigateEvent } from '../events/navigateEvent/NavigateEvent'

export class ApplicationStartUseCase extends UseCase {
    constructor (
        private eventApplicationService: EventApplicationService
    ) { super() }

    execute (event: ApplicationEvent): Promise<void> {
        return this.eventApplicationService.sentEvent(new NavigateEvent(InterfaceView.MAIN_MENU))
    }
}
