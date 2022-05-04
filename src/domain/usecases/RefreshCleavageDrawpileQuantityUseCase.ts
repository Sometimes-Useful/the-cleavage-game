import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { RefreshCleavageDrawpileQuantityEvent } from '../events/refreshCleavageDrawpileQuantity/RefreshCleavageDrawpileQuantityEvent'
import { UseCase } from './UseCase'

interface RefreshCleavageDrawpileQuantityUseCaseApplicationServices {
    interface: InterfaceApplicationService
    cleavage: CleavageApplicationService

}

export class RefreshCleavageDrawpileQuantityUseCase extends UseCase {
    constructor (
        private applicationServices:RefreshCleavageDrawpileQuantityUseCaseApplicationServices
    ) { super() }

    execute (event: RefreshCleavageDrawpileQuantityEvent): Promise<void> {
        return this.applicationServices.cleavage.retrieveCleavageDrawpileQuantity()
            .then(cleavageDrawpileQuantity => this.applicationServices.interface.updateCleavageDrawpileQuantity(cleavageDrawpileQuantity))
    }
}
