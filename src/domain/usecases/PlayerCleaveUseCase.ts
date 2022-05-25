import { UseCase } from './UseCase'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { PlayerCleaveEvent } from '../events/playerCleave/PlayerCleaveEvent'
import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { MessageForPlayer, noCleavagePleaseWait } from '../entities/MessageForPlayer'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { waitForCleavageLaunchMessage } from '../entities/playerMessages'
import type { PlayerApplicationService } from '../applicationServices/PlayerApplicationService'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import { GamePhase } from '../entities/GamePhase'

interface PlayerCleaveUseCaseApplicationServices {
    event: EventApplicationService
    cleavage: CleavageApplicationService,
    chat: ChatApplicationService,
    interface:InterfaceApplicationService,
    player:PlayerApplicationService
}

export class PlayerCleaveUseCase extends UseCase {
    constructor (
        private applicationServices:PlayerCleaveUseCaseApplicationServices
    ) { super() }

    execute (event: PlayerCleaveEvent): Promise<void> {
        return this.applicationServices.player.addPlayer(event.username)
            .then(() => this.applicationServices.cleavage.retrieveCurrentGamePhase())
            .then(currentGamePhase => currentGamePhase !== GamePhase.CLEAVING
                ? this.applicationServices.chat.sendMessageToPlayer(new MessageForPlayer(event.username, waitForCleavageLaunchMessage))
                : this.onCleavingPhase(event)
            )
            .catch(error => Promise.reject(error))
    }

    private onCleavingPhase (event: PlayerCleaveEvent): Promise<void> {
        return this.applicationServices.cleavage.hasCurrentCleavage()
            .then(hasCleavage => hasCleavage
                ? this.onCleavage(event)
                : this.applicationServices.chat.sendMessageToPlayer(noCleavagePleaseWait(event.username))
            )
            .catch(error => Promise.reject(error))
    }

    private onCleavage (event: PlayerCleaveEvent): void | PromiseLike<void> {
        return this.applicationServices.cleavage.playerCleave(event)
            .then(() => this.updateCleavageOnInterface())
            .catch(error => Promise.reject(error))
    }

    private updateCleavageOnInterface (): void | PromiseLike<void> {
        return this.applicationServices.cleavage.loadCurrentCleavage()
            .then(cleavage => this.applicationServices.interface.updateCleavage(cleavage))
            .catch(error => Promise.reject(error))
    }
}
