import { UseCase } from './UseCase'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { NavigateEvent } from '../events/navigateEvent/NavigateEvent'
import { Sound } from '../entities/sound'
import { SupportedSound } from '../entities/SoundType'

interface NavigateUseCaseApplicationServices {
    interface:InterfaceApplicationService
}

export class NavigateUseCase extends UseCase {
    constructor (
        private applicationServices: NavigateUseCaseApplicationServices
    ) { super() }

    execute (event: NavigateEvent): Promise<void> {
        return Promise.resolve([
            this.applicationServices.interface.changeView(event.targetView),
            this.applicationServices.interface.playSound(new Sound(SupportedSound.POUFFF))
        ])
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }
}
