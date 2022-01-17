import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { Sound } from '../entities/sound'
import type { CancelCleavageEvent } from '../events/cancelCleavage/CancelCleavageEvent'
import { SoundType } from '../ports/SoundType'
import { UseCase } from './UseCase'

export class CancelCleavageUseCase extends UseCase {
    constructor (
        private interfaceApplicationService:InterfaceApplicationService
    ) { super() }

    execute (event: CancelCleavageEvent): Promise<void> {
        return this.interfaceApplicationService.clearCleavage()
            .then(() => this.interfaceApplicationService.playSound(new Sound(SoundType.QUACK)))
            .catch(error => Promise.reject(error))
    }
}
