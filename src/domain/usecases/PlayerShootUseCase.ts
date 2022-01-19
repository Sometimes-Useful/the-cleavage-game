import { UseCase } from './UseCase'
import type { ApplicationEvent } from '../events/GameEvent'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { Sound } from '../entities/sound'
import { SupportedSound } from '../ports/SoundType'

export class PlayerShootUseCase extends UseCase {
    constructor (
        private interfaceApplicationService: InterfaceApplicationService
    ) { super() }

    execute (event: ApplicationEvent): Promise<void> {
        return this.interfaceApplicationService.playSound(new Sound(SupportedSound.SHOOT))
    }
}
