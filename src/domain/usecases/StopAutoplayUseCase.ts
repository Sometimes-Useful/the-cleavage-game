import type { AutoplayApplicationService } from '../applicationServices/AutoplayApplicationService'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { ApplicationEvent } from '../events/GameEvent'
import { UseCase } from './UseCase'

interface StopAutoplayUseCaseApplicationServices {
    interface: InterfaceApplicationService
    autoplay: AutoplayApplicationService

}

export class StopAutoplayUseCase extends UseCase {
    constructor (
        private applicationServices:StopAutoplayUseCaseApplicationServices
    ) { super() }

    execute (event: ApplicationEvent): Promise<void> {
        return this.applicationServices.autoplay.configureNextAutoPlay(0)
            .then(() => this.applicationServices.interface.disableAutoplay())
            .catch(error => Promise.reject(error))
    }
}
