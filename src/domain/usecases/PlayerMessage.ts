import { UseCase } from './UseCase'
import type { PlayerMessageEvent } from '../events/playerMessage/PlayerMessageEvent'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import { applicationMessagePrefix } from '../entities/applicationMessagePrefix'
import { AuthorizedMessage } from '../entities/AuthorizedMessage'
import { PlayerCleave } from '../entities/PlayerCleave'
import { PlayerCleaveEvent } from '../events/playerCleave/PlayerCleaveEvent'
import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { MessageForPlayer } from '../entities/MessageForPlayer'
import { dontKnowWhatToDoWithThatMessage } from '../entities/dontKnowWhatToDoWithThatMessage'

export class PlayerMessage extends UseCase {
    constructor (private eventApplicationService:EventApplicationService, private chatApplicationService:ChatApplicationService) { super() }
    execute (event: PlayerMessageEvent): Promise<void> {
        if (!event.message.startsWith(applicationMessagePrefix)) return Promise.resolve()
        if (event.message === applicationMessagePrefix + AuthorizedMessage.RIGHT)
            return this.eventApplicationService.sentEvent(new PlayerCleaveEvent(PlayerCleave.RIGHT, event.player))
        if (event.message === applicationMessagePrefix + AuthorizedMessage.LEFT)
            return this.eventApplicationService.sentEvent(new PlayerCleaveEvent(PlayerCleave.LEFT, event.player))
        return this.chatApplicationService.sendMessageToPlayer(new MessageForPlayer(event.player, dontKnowWhatToDoWithThatMessage(event.player)))
    }
}
