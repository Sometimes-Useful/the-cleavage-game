import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { ApplicationEvent } from '../events/GameEvent'
import { UseCase } from './UseCase'

interface HelpDisabledUseCaseApplicationServices {
    interface: InterfaceApplicationService;
}
export class HelpDisabledUseCase extends UseCase {
    constructor (
        private applicationServices: HelpDisabledUseCaseApplicationServices
    ) { super() }

    execute (event: ApplicationEvent): Promise<void> {
        return this.applicationServices.interface.helpDisabled()
    }
}
