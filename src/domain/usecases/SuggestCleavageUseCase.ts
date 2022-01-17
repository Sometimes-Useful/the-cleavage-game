import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import { MessageForPlayer } from '../entities/MessageForPlayer'
import { cleavageAlreadySuggested, cleavageSuggested } from '../entities/playerMessages'
import type { PlayerSuggestCleavageEvent } from '../events/suggestCleavage/PlayerSuggestCleavageEvent'
import { UseCase } from './UseCase'

export class SuggestCleavageUseCase extends UseCase {
    constructor (
        private chatApplicationService:ChatApplicationService,
        private cleavageApplicationService:CleavageApplicationService
    ) { super() }

    execute (event: PlayerSuggestCleavageEvent): Promise<void> {
        return this.cleavageApplicationService.isPublicCleavageExist(event.cleavage)
            .then(isPublicCleavageExist => isPublicCleavageExist
                ? this.chatApplicationService.sendMessageToPlayer(new MessageForPlayer(event.player, cleavageAlreadySuggested))
                : this.onPublicCleavageExist(event)
            )
    }

    onPublicCleavageExist (event: PlayerSuggestCleavageEvent): Promise<void> {
        return this.cleavageApplicationService.addPublicCleavage(event.cleavage)
            .then(() => this.chatApplicationService.sendMessageToPlayer(new MessageForPlayer(event.player, cleavageSuggested(event.player, event.cleavage.title))))
            .catch(error => Promise.reject(error))
    }
}
