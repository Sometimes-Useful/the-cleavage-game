import { UseCase } from './UseCase'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { ApplicationEvent } from '../events/GameEvent'
import type { Cleavage } from '../entities/Cleavage'
import { Sound } from '../entities/sound'
import { SoundType } from '../ports/SoundType'

export class PublicCleavageUseCase extends UseCase {
    constructor (
        private cleavageApplicationService: CleavageApplicationService,
        private interfaceApplicationService: InterfaceApplicationService
    ) { super() }

    execute (event: ApplicationEvent): Promise<void> {
        return this.cleavageApplicationService.nextPublicCleavage()
            .then(cleavage => cleavage
                ? this.onPublicCleavage(cleavage)
                : this.onNoPublicCleavage())
            .catch(error => Promise.reject(error))
    }

    private onPublicCleavage (cleavage: Cleavage): void | PromiseLike<void> {
        return Promise.all([
            this.interfaceApplicationService.updateCleavage(cleavage),
            this.interfaceApplicationService.playSound(new Sound(SoundType.DICE_ROLL))
        ])
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    private onNoPublicCleavage (): Promise<void> {
        return Promise.all([
            this.interfaceApplicationService.onNoPublicCleavage(),
            this.interfaceApplicationService.playSound(new Sound(SoundType.ERROR))
        ])
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }
}
