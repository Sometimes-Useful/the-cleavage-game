import { UseCase } from './UseCase'
import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { MessageForPlayer } from '../entities/MessageForPlayer'
import { helpMessage } from '../entities/playerMessages'
import type { PlayerAskForHelpEvent } from '../events/playerAskForHelp/PlayerAskForHelpEvent'

export class AskForHelpUseCase extends UseCase {
    constructor (
        private chatApplicationService: ChatApplicationService
    ) { super() }

    execute (event: PlayerAskForHelpEvent): Promise<void> {
        return this.chatApplicationService.sendMessageToPlayer(new MessageForPlayer(event.player, helpMessage))
    }
}
