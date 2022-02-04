import { UseCase } from './UseCase'
import { InterfaceView } from '../entities/InterfaceView'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import { NavigateEvent } from '../events/navigateEvent/NavigateEvent'
import type { ApplicationStartEvent } from '../events/applicationStart/ApplicationStartEvent'

interface ApplicationStartUseCaseApplicationServices {
    event:EventApplicationService
}

export class ApplicationStartUseCase extends UseCase {
    constructor (
        private applicationServices: ApplicationStartUseCaseApplicationServices
    ) { super() }

    execute (event: ApplicationStartEvent): Promise<void> {
        return this.applicationServices.event.sentEvent(new NavigateEvent(InterfaceView.MAIN_MENU))
    }
}
