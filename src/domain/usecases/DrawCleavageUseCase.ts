import { UseCase } from './UseCase'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { ApplicationEvent } from '../events/GameEvent'
import type { Cleavage } from '../entities/Cleavage'
import { Sound } from '../entities/sound'
import { SupportedSound } from '../entities/SoundType'

export class DrawCleavageUseCase extends UseCase {
    constructor (
        private cleavageApplicationService: CleavageApplicationService,
        private interfaceApplicationService: InterfaceApplicationService
    ) { super() }

    execute (event: ApplicationEvent): Promise<void> {
        return this.cleavageApplicationService.nextPublicCleavage()
            .then(cleavage => cleavage
                ? this.onCleavage(cleavage)
                : this.onNoPublicCleavage())
            .catch(error => Promise.reject(error))
    }

    private onCleavage (cleavage: Cleavage): void | PromiseLike<void> {
        return Promise.all([
            this.interfaceApplicationService.updateCleavage(cleavage),
            this.interfaceApplicationService.playSound(new Sound(SupportedSound.DICE_ROLL))
        ])
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    private onNoPublicCleavage (): Promise<void> {
        return this.cleavageApplicationService.randomGlobalCleavage()
            .then(cleavage => cleavage
                ? this.onCleavage(cleavage)
                : this.onNoGlobalCleavage())
            .catch(error => Promise.reject(error))
    }

    private onNoGlobalCleavage (): Promise<void> {
        return Promise.all([
            this.interfaceApplicationService.onNoPublicCleavage(),
            this.interfaceApplicationService.playSound(new Sound(SupportedSound.ERROR))
        ])
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }
}
