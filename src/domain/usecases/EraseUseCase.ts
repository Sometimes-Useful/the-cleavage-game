import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { EraseEvent } from '../events/erase/EraseEvent'
import { UseCase } from './UseCase'

interface EraseUseCaseApplicationServices {
    interface: InterfaceApplicationService

}

export class EraseUseCase extends UseCase {
    constructor (private applicationServices:EraseUseCaseApplicationServices) { super() }
    execute (event: EraseEvent): Promise<void> {
        const entityIdsToErase = Array.isArray(event.entityIdToErase) ? event.entityIdToErase : [event.entityIdToErase]
        return Promise.all(entityIdsToErase.map(entityId => this.applicationServices.interface.removeEntityInterfaceState(entityId)))
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }
}
