import { UseCase } from './UseCase'
import type { ApplicationEvent } from '../events/GameEvent'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { Sound } from '../entities/sound'
import { SupportedSound } from '../entities/SoundType'

interface PlayerApplauseUseCaseApplicationServices {
    interface:InterfaceApplicationService
}

export class PlayerApplauseUseCase extends UseCase {
    constructor (
        private applicationServices: PlayerApplauseUseCaseApplicationServices
    ) { super() }

    execute (event: ApplicationEvent): Promise<void> {
        return this.applicationServices.interface.playSound(new Sound(SupportedSound.APPLAUSE))
    }
}
