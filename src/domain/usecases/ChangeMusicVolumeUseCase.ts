import { UseCase } from './UseCase'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { ChangeMusicVolumeEvent } from '../events/changeMusicVolume/ChangeMusicVolumeEvent'
import { Sound } from '../entities/sound'
import { SupportedSound } from '../ports/SoundType'

export class ChangeMusicVolumeUseCase extends UseCase {
    constructor (
        private interfaceApplicationService: InterfaceApplicationService
    ) { super() }

    execute (event: ChangeMusicVolumeEvent): Promise<void> {
        return this.interfaceApplicationService.changeMusicVolumeLevel(event.volume)
            .then(() => this.interfaceApplicationService.playSound(new Sound(SupportedSound.TICK)))
            .catch(error => Promise.reject(error))
    }
}
