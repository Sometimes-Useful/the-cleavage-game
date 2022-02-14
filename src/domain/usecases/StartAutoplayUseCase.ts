import type { AutoplayApplicationService } from '../applicationServices/AutoplayApplicationService'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { DrawCleavageEvent } from '../events/drawCleavage/DrawCleavageEvent'
import type { StartAutoPlayEvent } from '../events/startAutoPlay/StartAutoPlayEvent'
import { UseCase } from './UseCase'

interface StartAutoplayUseCaseApplicationServices {
    interface: InterfaceApplicationService
    autoplay: AutoplayApplicationService
    event:EventApplicationService
    cleavage:CleavageApplicationService
}
export class StartAutoplayUseCase extends UseCase {
    constructor (
        private applicationServices:StartAutoplayUseCaseApplicationServices
    ) { super() }

    execute (event: StartAutoPlayEvent): Promise<void> {
        return this.applicationServices.autoplay.configureNextAutoPlay(event.autoplayMinutes)
            .then(() => this.applicationServices.interface.enableAutoplay())
            .then(() => this.applicationServices.event.sentEvent(new DrawCleavageEvent()))
            .catch(error => Promise.reject(error))
    }
}
