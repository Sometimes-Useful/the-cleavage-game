import { UseCase } from './UseCase'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { PlayerCleaveEvent } from '../events/playerCleave/PlayerCleaveEvent'
import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { MessageForPlayer, noCleavagePleaseWait } from '../entities/MessageForPlayer'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { InterfaceView } from '../entities/InterfaceView'
import { waitForCleavageLaunchMessage } from '../entities/playerMessages'
import type { PlayerApplicationService } from '../applicationServices/PlayerApplicationService'

interface PlayerCleaveUseCaseApplicationServices {
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
        return this.applicationServices.player.addPlayer(event.player)
            .then(() => this.applicationServices.interface.retrieveCurrentView())
            .then(currentView => currentView !== InterfaceView.CURRENT_CLEAVAGE
                ? this.applicationServices.chat.sendMessageToPlayer(new MessageForPlayer(event.player, waitForCleavageLaunchMessage))
                : this.onCurrentCleavage(event)
            )
            .catch(error => Promise.reject(error))
    }

    private onCurrentCleavage (event: PlayerCleaveEvent): Promise<void> {
        return this.applicationServices.cleavage.hasCleavage()
            .then(hasCleavage => hasCleavage
                ? this.onCleavage(event)
                : this.applicationServices.chat.sendMessageToPlayer(noCleavagePleaseWait(event.player))
            )
            .catch(error => Promise.reject(error))
    }

    private onCleavage (event: PlayerCleaveEvent): void | PromiseLike<void> {
        return this.applicationServices.cleavage.playerCleave(event)
            .then(() => this.updateCleavageOnInterface())
            .catch(error => Promise.reject(error))
    }

    private updateCleavageOnInterface (): void | PromiseLike<void> {
        return this.applicationServices.cleavage.loadCleavage()
            .then(cleavage => this.applicationServices.interface.updateCleavage(cleavage))
            .catch(error => Promise.reject(error))
    }
}
