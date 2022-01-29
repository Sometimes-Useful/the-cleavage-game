import { UseCase } from './UseCase'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { NavigateEvent } from '../events/navigateEvent/NavigateEvent'
import { Sound } from '../entities/sound'
import { SupportedSound } from '../entities/SoundType'

export class NavigateUseCase extends UseCase {
    constructor (
        private interfaceApplicationService: InterfaceApplicationService
    ) { super() }

    execute (event: NavigateEvent): Promise<void> {
        return Promise.resolve([
            this.interfaceApplicationService.changeView(event.targetView),
            this.interfaceApplicationService.playSound(new Sound(SupportedSound.POUFFF))
        ])
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }
}
