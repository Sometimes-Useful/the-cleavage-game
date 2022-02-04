import { UseCase } from './UseCase'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { Cleavage } from '../entities/Cleavage'
import { Sound } from '../entities/sound'
import { SupportedSound } from '../entities/SoundType'
import type { DrawCleavageEvent } from '../events/drawCleavage/DrawCleavageEvent'
import type { AutoplayApplicationService } from '../applicationServices/AutoplayApplicationService'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import { LaunchCleavageEvent } from '../events/launchCleavage/LaunchCleavageEvent'

interface DrawCleavageUseCaseApplicationServices {
    event: EventApplicationService
    cleavage: CleavageApplicationService,
    interface: InterfaceApplicationService,
    autoplay: AutoplayApplicationService
}

export class DrawCleavageUseCase extends UseCase {
    constructor (
        private applicationServices:DrawCleavageUseCaseApplicationServices
    ) { super() }

    execute (event: DrawCleavageEvent): Promise<void> {
        return this.applicationServices.cleavage.nextPublicCleavage()
            .then(cleavage => cleavage
                ? this.onCleavage(cleavage)
                : this.onNoPublicCleavage()
            )
            .catch(error => Promise.reject(error))
    }

    private onCleavage (cleavage: Cleavage):Promise<void> {
        return Promise.all([
            this.applicationServices.cleavage.saveCleavage(cleavage),
            this.applicationServices.interface.updateCleavage(cleavage),
            this.applicationServices.interface.playSound(new Sound(SupportedSound.DICE_ROLL))
        ])
            .then(results => this.applicationServices.autoplay.hasAutoplay())
            .then(hasAutoplay => hasAutoplay
                ? this.applicationServices.event.sentEvent(new LaunchCleavageEvent(cleavage.title, cleavage.leftChoice.name, cleavage.rightChoice.name))
                : Promise.resolve()
            )
            .catch(error => Promise.reject(error))
    }

    private onNoPublicCleavage (): Promise<void> {
        return this.applicationServices.cleavage.randomGlobalCleavage()
            .then(cleavage => cleavage
                ? this.onCleavage(cleavage)
                : this.onNoGlobalCleavage()
            )
            .catch(error => Promise.reject(error))
    }

    private onNoGlobalCleavage (): Promise<void> {
        return Promise.all([
            this.applicationServices.interface.onNoCleavageAvailable(),
            this.applicationServices.interface.playSound(new Sound(SupportedSound.ERROR))
        ])
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }
}
