import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { ChangeVideoExtractVolumeEvent } from '../events/changeVideoExtractVolume/ChangeVideoExtractVolumeEvent'
import { UseCase } from './UseCase'

interface ChangeVideoExtractVolumeUseCaseApplicationServices {
    interface: InterfaceApplicationService

}

export class ChangeVideoExtractVolumeUseCase extends UseCase {
    constructor (private applicationServices:ChangeVideoExtractVolumeUseCaseApplicationServices) { super() }
    execute (event: ChangeVideoExtractVolumeEvent): Promise<void> {
        return this.applicationServices.interface.changeVideoExtractVolumeLevel(event.volume)
    }
}
