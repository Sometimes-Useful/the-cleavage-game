import { UseCase } from './UseCase'
import type { PlayerMessageEvent } from '../events/playerMessage/PlayerMessageEvent'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import { applicationMessagePrefix } from '../entities/applicationMessagePrefix'
import { AuthorizedMessage } from '../entities/AuthorizedMessage'
import { PlayerCleave } from '../entities/PlayerCleave'
import { PlayerCleaveEvent } from '../events/playerCleave/PlayerCleaveEvent'
import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { MessageForPlayer } from '../entities/MessageForPlayer'
import { PlayerSuggestCleavageEvent } from '../events/suggestCleavage/PlayerSuggestCleavageEvent'
import { Cleavage } from '../entities/Cleavage'
import { dontKnowWhatToDoWithThatMessage } from '../entities/playerMessages'
import { PlayerApplauseEvent } from '../events/playerApplause/PlayerApplauseEvent'
import { PlayerShootEvent } from '../events/playerShoot/PlayerShootEvent'
import { PlayerHyperLikeEvent } from '../events/playerHyperLike/PlayerHyperLikeEvent'
import { PlayerWhistleEvent } from '../events/playerWhistle/PlayerWhistleEvent'
import type { ApplicationEvent } from '../events/GameEvent'
import { PlayerAskForHelpEvent } from '../events/playerAskForHelp/PlayerAskForHelpEvent'
import type { Player } from '../entities/Player'

export class PlayerMessage extends UseCase {
    constructor (private eventApplicationService:EventApplicationService, private chatApplicationService:ChatApplicationService) { super() }
    execute (event: PlayerMessageEvent): Promise<void> {
        return event.message.startsWith(applicationMessagePrefix)
            ? this.onApplicationEvent(event.player, event.message)
            : Promise.resolve()
    }

    private onApplicationEvent (player:Player, message:string):Promise<void> {
        const applicationEvent = this.applicationEventStrategies(message, player).get(true)
        return applicationEvent
            ? this.eventApplicationService.sentEvent(applicationEvent)
            : this.chatApplicationService.sendMessageToPlayer(new MessageForPlayer(player, dontKnowWhatToDoWithThatMessage(player)))
    }

    private applicationEventStrategies (message: string, player: Player): Map<boolean, ApplicationEvent> {
        return new Map([
            [message === applicationMessagePrefix + AuthorizedMessage.SHORT_APPLAUSE, new PlayerApplauseEvent()],
            [message === applicationMessagePrefix + AuthorizedMessage.SHORT_WHISTLE, new PlayerWhistleEvent()],
            [message === applicationMessagePrefix + AuthorizedMessage.SHORT_HYPERLIKE, new PlayerHyperLikeEvent()],
            [message === applicationMessagePrefix + AuthorizedMessage.SHORT_SHOOT, new PlayerShootEvent()],
            [message === applicationMessagePrefix + AuthorizedMessage.RIGHT, new PlayerCleaveEvent(player, PlayerCleave.RIGHT)],
            [message === applicationMessagePrefix + AuthorizedMessage.LEFT, new PlayerCleaveEvent(player, PlayerCleave.LEFT)],
            [message === applicationMessagePrefix + AuthorizedMessage.HELP, new PlayerAskForHelpEvent(player)],
            [message === applicationMessagePrefix + AuthorizedMessage.SHORT_HELP, new PlayerAskForHelpEvent(player)],
            [message.startsWith(applicationMessagePrefix + AuthorizedMessage.SUGGEST_CLEAVAGE), new PlayerSuggestCleavageEvent(player, new Cleavage(message.replace(applicationMessagePrefix + AuthorizedMessage.SUGGEST_CLEAVAGE, '').trimStart()))]
        ])
    }
}
