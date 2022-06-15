
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { Sound } from '../entities/sound'
import { SupportedSound } from '../entities/SoundType'
import type { ApplicationEvent } from '../events/GameEvent'
import { UseCase } from './UseCase'

interface HelpEnabledUseCaseApplicationServices {
    interface: InterfaceApplicationService;
}
export class HelpEnabledUseCase extends UseCase {
    constructor (
        private applicationServices: HelpEnabledUseCaseApplicationServices
    ) { super() }

    execute (event: ApplicationEvent): Promise<void> {
        return this.applicationServices.interface.helpEnabled()
            .then(() => this.applicationServices.interface.playSound(new Sound(SupportedSound.TICK)))
            .catch(error => Promise.reject(error))
    }
}
