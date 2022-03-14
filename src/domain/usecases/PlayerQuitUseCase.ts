import { UseCase } from './UseCase'
import type { PlayerApplicationService } from '../applicationServices/PlayerApplicationService'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { PlayerQuitEvent } from '../events/playerQuit/PlayerQuitEvent'
import type { Player } from '../entities/Player'

interface PlayerQuitUseCaseApplicationServices {
    player:PlayerApplicationService
    cleavage:CleavageApplicationService
    interface:InterfaceApplicationService
}

export class PlayerQuitUseCase extends UseCase {
    constructor (
        private applicationServices:PlayerQuitUseCaseApplicationServices
    ) { super() }

    execute (event: PlayerQuitEvent): Promise<void> {
        return this.applicationServices.player.players()
            .then(players => {
                const player = players.find(player => player.username === event.username)
                return player ? this.onPlayer(player) : this.onMissingPlayer()
            })
    }

    private onMissingPlayer (): Promise<void> {
        return Promise.resolve()
    }

    private onPlayer (player:Player): Promise<void> {
        return this.applicationServices.player.removePlayer(player)
            .then(() => this.applicationServices.cleavage.hasCleavage())
            .then(hasCleavage => hasCleavage
                ? this.onCleavage(player)
                : Promise.resolve()
            )
            .catch(error => Promise.reject(error))
    }

    private onCleavage (player: Player): Promise<void> {
        return this.applicationServices.cleavage.removePlayerOnCleavage(player)
            .then(() => this.applicationServices.cleavage.loadCleavage())
            .then(cleavage => this.applicationServices.interface.updateCleavage(cleavage))
            .catch(error => Promise.reject(error))
    }
}
