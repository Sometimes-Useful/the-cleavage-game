import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { EraseEvent } from '../events/erase/EraseEvent'
import { uniqueOrArrayToArray } from '../../generic/array'
import { UseCase } from './UseCase'

interface EraseUseCaseApplicationServices {
    interface: InterfaceApplicationService

}

export class EraseUseCase extends UseCase {
    constructor (private applicationServices:EraseUseCaseApplicationServices) { super() }
    execute (event: EraseEvent): Promise<void> {
        return Promise.all(uniqueOrArrayToArray(event.entityIdToErase).map(entityId => this.applicationServices.interface.removeEntityInterfaceState(entityId)))
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }
}
