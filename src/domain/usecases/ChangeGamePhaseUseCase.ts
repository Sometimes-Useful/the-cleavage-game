import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { ChangeGamePhaseEvent } from '../events/changeGamePhase/ChangeGamePhaseEvent'
import { UseCase } from './UseCase'

interface ChangeGamePhaseUseCaseApplicationServices {
    interface: InterfaceApplicationService
    cleavage:CleavageApplicationService
}

export class ChangeGamePhaseUseCase extends UseCase {
    constructor (private applicationServices: ChangeGamePhaseUseCaseApplicationServices) { super() }
    execute (event: ChangeGamePhaseEvent): Promise<void> {
        return this.applicationServices.cleavage.changeGamePhase(event.gamePhase)
            .then(() => this.applicationServices.interface.changeGamePhase(event.gamePhase))
            .catch(error => Promise.reject(error))
    }
}
