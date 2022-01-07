import { UseCase } from './UseCase'
import { PlayerMessageEvent } from '../events/playerMessage/PlayerMessageEvent'
import { EventApplicationService } from '../applicationServices/EventApplicationService'
import { applicationMessagePrefix } from '../entities/applicationMessagePrefix'
import { AuthorizedMessage } from '../entities/AuthorizedMessage'
import { PlayerCleave } from '../entities/PlayerCleave'
import { PlayerCleaveEvent } from '../events/playerCleave/PlayerCleaveEvent'
import { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { MessageForPlayer } from '../entities/MessageForPlayer'
import { dontKnowWhatToDoWithThatMessage } from '../entities/dontKnowWhatToDoWithThatMessage'
import { player } from '../tests/testContexts'

export class PlayerMessage extends UseCase {
    constructor (private eventApplicationService:EventApplicationService, private chatApplicationService:ChatApplicationService) { super() }
    execute (event: PlayerMessageEvent): Promise<void> {
        if (!event.message.startsWith(applicationMessagePrefix)) return Promise.resolve()
        if (event.message === applicationMessagePrefix + AuthorizedMessage.RIGHT)
            return this.eventApplicationService.sentEvent(new PlayerCleaveEvent(PlayerCleave.RIGHT, player))
        if (event.message === applicationMessagePrefix + AuthorizedMessage.LEFT)
            return this.eventApplicationService.sentEvent(new PlayerCleaveEvent(PlayerCleave.LEFT, player))
        return this.chatApplicationService.sendMessageToPlayer(new MessageForPlayer(event.player, dontKnowWhatToDoWithThatMessage(event.player)))
    }
}
