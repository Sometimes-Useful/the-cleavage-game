
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { ApplicationEvent } from '../events/GameEvent'
import { UseCase } from './UseCase'

interface HelpEnabledUseCaseApplicationServices {
    interface: InterfaceApplicationService;
}
export class HelpEnabledUseCase extends UseCase {
    constructor (
        private applicationServices: HelpEnabledUseCaseApplicationServices
    ) { super() }

    execute (event: ApplicationEvent): Promise<void> {
        return this.applicationServices.interface.helpEnabled()
    }
}
