import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { DrawEvent } from '../events/draw/DrawEvent'
import { UseCase } from './UseCase'

interface DrawUseCaseApplicationServices {
    interface:InterfaceApplicationService
}

export class DrawUseCase extends UseCase {
    constructor (private applicationServices:DrawUseCaseApplicationServices) { super() }
    execute (event: DrawEvent): Promise<void> {
        return event.interfaceEntityState
            ? this.applicationServices.interface.updateEntityInterfaceState(event.id, event.interfaceEntityState)
            : this.applicationServices.interface.removeEntityInterfaceState(event.id)
    }
}
