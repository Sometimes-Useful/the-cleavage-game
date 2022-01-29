import { UseCase } from './UseCase'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { ChangeMusicVolumeEvent } from '../events/changeMusicVolume/ChangeMusicVolumeEvent'
import { Sound } from '../entities/sound'
import { SupportedSound } from '../entities/SoundType'

export class ChangeSoundVolumeUseCase extends UseCase {
    constructor (
        private interfaceApplicationService: InterfaceApplicationService
    ) { super() }

    execute (event: ChangeMusicVolumeEvent): Promise<void> {
        return this.interfaceApplicationService.changeSoundVolumeLevel(event.volume)
            .then(() => this.interfaceApplicationService.playSound(new Sound(SupportedSound.TICK)))
            .catch(error => Promise.reject(error))
    }
}
