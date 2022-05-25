import { UseCase } from './UseCase'
import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { MessageForPlayer } from '../entities/MessageForPlayer'
import { helpMessage } from '../entities/playerMessages'
import type { PlayerAskForHelpEvent } from '../events/playerAskForHelp/PlayerAskForHelpEvent'

interface AskForHelpUseCaseApplicationServices {
    chat:ChatApplicationService
}

export class AskForHelpUseCase extends UseCase {
    constructor (
        private applicationServices: AskForHelpUseCaseApplicationServices
    ) { super() }

    execute (event: PlayerAskForHelpEvent): Promise<void> {
        return this.applicationServices.chat.sendMessageToPlayer(new MessageForPlayer(event.username, helpMessage))
    }
}
