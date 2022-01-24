import { UseCase } from './UseCase'
import type { PlayerJoinEvent } from '../events/playerJoin/PlayerJoinEvent'
import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { welcomePlayerMessage } from '../entities/MessageForPlayer'
import type { PlayerApplicationService } from '../applicationServices/PlayerApplicationService'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { Player } from '../entities/Player'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'

export class PlayerJoinUseCase extends UseCase {
    constructor (
        private playerApplicationService:PlayerApplicationService,
        private chatApplicationService:ChatApplicationService,
        private cleavageApplicationService:CleavageApplicationService,
        private interfaceApplicationService:InterfaceApplicationService
    ) { super() }

    execute (event: PlayerJoinEvent): Promise<void> {
        return this.playerApplicationService.addPlayer(event.player)
            .then(() => this.chatApplicationService.sendMessageToPlayer(welcomePlayerMessage(event.player)))
            .then(() => this.cleavageApplicationService.hasCleavage())
            .then(hasCleavage => hasCleavage ? this.addPlayerOnCleavage(event.player) : Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    addPlayerOnCleavage (player: Player): Promise<void> {
        return this.cleavageApplicationService.addPlayerOnCleavage(player)
            .then(() => this.cleavageApplicationService.loadCleavage())
            .then(cleavage => this.interfaceApplicationService.updateCleavage(cleavage))
            .catch(error => Promise.reject(error))
    }
}
