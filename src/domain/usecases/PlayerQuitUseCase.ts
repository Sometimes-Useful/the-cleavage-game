import { UseCase } from './UseCase'
import type { PlayerApplicationService } from '../applicationServices/PlayerApplicationService'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { PlayerQuitEvent } from '../events/playerQuit/PlayerQuitEvent'
import type { Player } from '../entities/Player'
import type { BarApplicationService } from '../applicationServices/BarApplicationService'

interface PlayerQuitUseCaseApplicationServices {
    player:PlayerApplicationService
    cleavage:CleavageApplicationService
    interface:InterfaceApplicationService
    bar:BarApplicationService
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
            .then(() => this.applicationServices.cleavage.hasCurrentCleavage())
            .then(hasCleavage => hasCleavage
                ? this.onCleavage(player)
                : this.quitBar(player)
            )
            .catch(error => Promise.reject(error))
    }

    private quitBar (player: Player): Promise<void> {
        return this.applicationServices.bar.isPlayerInstalledOnTableStool(player.username)
            .then(isPlayerInstalledOnStool => isPlayerInstalledOnStool
                ? this.applicationServices.bar.removePlayerFromTableStool(player.username)
                : this.onPlayerMaybeInstalledOnBarStool(player))
            .catch(error => Promise.reject(error))
    }

    private onPlayerMaybeInstalledOnBarStool (player:Player): Promise<void> {
        return this.applicationServices.bar.isPlayerInstalledOnBarStool(player.username)
            .then(isPlayerInstalledOnBarStool => isPlayerInstalledOnBarStool
                ? this.applicationServices.bar.removePlayerFromBarStool(player.username)
                : Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    private onCleavage (player: Player): Promise<void> {
        return this.applicationServices.cleavage.removePlayerOnCleavage(player)
            .then(() => this.applicationServices.cleavage.loadCurrentCleavage())
            .then(cleavage => this.applicationServices.interface.updateCleavage(cleavage))
            .then(() => this.quitBar(player))
            .catch(error => Promise.reject(error))
    }
}
