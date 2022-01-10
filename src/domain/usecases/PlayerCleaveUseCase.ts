import { UseCase } from './UseCase'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { PlayerCleaveEvent } from '../events/playerCleave/PlayerCleaveEvent'
import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { noCleavagePleaseWait } from '../entities/MessageForPlayer'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'

export class PlayerCleaveUseCase extends UseCase {
    constructor (
        private cleavageApplicationService: CleavageApplicationService,
        private chatApplicationService: ChatApplicationService,
        private interfaceApplicationService:InterfaceApplicationService
    ) { super() }

    execute (event: PlayerCleaveEvent): Promise<void> {
        return this.cleavageApplicationService.hasCleavage()
            .then(hasCleavage => hasCleavage ? this.onCleavage(event) : this.chatApplicationService.sendMessageToPlayer(noCleavagePleaseWait(event.player)))
            .catch(error => Promise.reject(error))
    }

    private onCleavage (event: PlayerCleaveEvent): void | PromiseLike<void> {
        return this.cleavageApplicationService.playerCleave(event)
            .then(() => this.updateCleavageOnInterface())
            .catch(error => Promise.reject(error))
    }

    private updateCleavageOnInterface (): void | PromiseLike<void> {
        return this.cleavageApplicationService.loadCleavage()
            .then(cleavage => this.interfaceApplicationService.updateCleavage(cleavage))
            .catch(error => Promise.reject(error))
    }
}
