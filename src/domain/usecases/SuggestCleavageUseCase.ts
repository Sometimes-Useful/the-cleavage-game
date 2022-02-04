import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import { MessageForPlayer } from '../entities/MessageForPlayer'
import { cleavageAlreadySuggested, cleavageSuggested } from '../entities/playerMessages'
import type { PlayerSuggestCleavageEvent } from '../events/suggestCleavage/PlayerSuggestCleavageEvent'
import { UseCase } from './UseCase'

interface SuggestCleavageUseCaseApplicationServices {
    chat:ChatApplicationService
    cleavage:CleavageApplicationService
}

export class SuggestCleavageUseCase extends UseCase {
    constructor (
        private applicationServices:SuggestCleavageUseCaseApplicationServices
    ) { super() }

    execute (event: PlayerSuggestCleavageEvent): Promise<void> {
        return this.applicationServices.cleavage.isPublicCleavageExist(event.cleavage)
            .then(isPublicCleavageExist => isPublicCleavageExist
                ? this.applicationServices.chat.sendMessageToPlayer(new MessageForPlayer(event.player, cleavageAlreadySuggested))
                : this.onPublicCleavageExist(event)
            )
            .catch(error => Promise.reject(error))
    }

    onPublicCleavageExist (event: PlayerSuggestCleavageEvent): Promise<void> {
        return this.applicationServices.cleavage.addPublicCleavage(event.cleavage)
            .then(() => this.applicationServices.chat.sendMessageToPlayer(new MessageForPlayer(event.player, cleavageSuggested(event.player, event.cleavage.title))))
            .catch(error => Promise.reject(error))
    }
}
