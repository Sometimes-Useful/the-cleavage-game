import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { GamePhase } from '../entities/GamePhase'
import { Sound } from '../entities/sound'
import { SupportedSound } from '../entities/SoundType'
import type { ChangeGamePhaseEvent } from '../events/changeGamePhase/ChangeGamePhaseEvent'
import { UseCase } from './UseCase'

interface ChangeGamePhaseUseCaseApplicationServices {
    interface: InterfaceApplicationService
    cleavage:CleavageApplicationService
}

export class ChangeGamePhaseUseCase extends UseCase {
    constructor (private applicationServices: ChangeGamePhaseUseCaseApplicationServices) { super() }
    execute (event: ChangeGamePhaseEvent): Promise<void> {
        return this.applicationServices.cleavage.retrieveCurrentGamePhase()
            .then(previousGamePhase => this.onPreviousGamePhase(event, previousGamePhase))
            .catch(error => Promise.reject(error))
    }

    private onPreviousGamePhase (event: ChangeGamePhaseEvent, previousGamePhase: GamePhase): Promise<void> {
        return this.applicationServices.cleavage.changeGamePhase(event.gamePhase)
            .then(() => this.applicationServices.interface.changeGamePhase(event.gamePhase))
            .then(() => this.playPouffOnGamePhases(previousGamePhase))
            .catch(error => Promise.reject(error))
    }

    private playPouffOnGamePhases (previousGamePhase: GamePhase): Promise<void> {
        return previousGamePhase !== GamePhase.NONE
            ? this.applicationServices.interface.playSound(new Sound(SupportedSound.POUFFF))
            : Promise.resolve()
    }
}
