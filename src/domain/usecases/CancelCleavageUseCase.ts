import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { Sound } from '../entities/sound'
import { SupportedSound } from '../entities/SoundType'
import type { CancelCleavageEvent } from '../events/cancelCleavage/CancelCleavageEvent'
import { UseCase } from './UseCase'

interface CancelCleavageUseCaseApplicationServices {
    interface:InterfaceApplicationService
}

export class CancelCleavageUseCase extends UseCase {
    constructor (
        private applicationServices:CancelCleavageUseCaseApplicationServices
    ) { super() }

    execute (event: CancelCleavageEvent): Promise<void> {
        return this.applicationServices.interface.clearCleavage()
            .then(() => this.applicationServices.interface.playSound(new Sound(SupportedSound.QUACK)))
            .catch(error => Promise.reject(error))
    }
}
