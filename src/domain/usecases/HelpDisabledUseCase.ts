import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { Sound } from '../entities/sound'
import { SupportedSound } from '../entities/SoundType'
import type { ApplicationEvent } from '../events/GameEvent'
import { UseCase } from './UseCase'

interface HelpDisabledUseCaseApplicationServices {
    interface: InterfaceApplicationService;
}
export class HelpDisabledUseCase extends UseCase {
    constructor (
        private applicationServices: HelpDisabledUseCaseApplicationServices
    ) { super() }

    execute (event: ApplicationEvent): Promise<void> {
        return this.applicationServices.interface.helpDisabled()
            .then(() => this.applicationServices.interface.playSound(new Sound(SupportedSound.TICK)))
            .catch(error => Promise.reject(error))
    }
}
