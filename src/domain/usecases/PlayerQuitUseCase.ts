import { UseCase } from './UseCase'
import type { PlayerApplicationService } from '../applicationServices/PlayerApplicationService'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { PlayerQuitEvent } from '../events/playerQuit/PlayerQuitEvent'
import type { Player } from '../entities/Player'

export class PlayerQuitUseCase extends UseCase {
    constructor (
        private playerApplicationService: PlayerApplicationService,
        private cleavageApplicationService: CleavageApplicationService,
        private interfaceApplicationService: InterfaceApplicationService
    ) { super() }

    execute (event: PlayerQuitEvent): Promise<void> {
        return this.playerApplicationService.removePlayer(event.player)
            .then(() => this.cleavageApplicationService.hasCleavage())
            .then(hasCleavage => hasCleavage ? this.onCleavage(event.player) : Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    private onCleavage (player: Player): Promise<void> {
        return this.cleavageApplicationService.removePlayerOnCleavage(player)
            .then(() => this.cleavageApplicationService.loadCleavage())
            .then(cleavage => this.interfaceApplicationService.updateCleavage(cleavage))
            .catch(error => Promise.reject(error))
    }
}
