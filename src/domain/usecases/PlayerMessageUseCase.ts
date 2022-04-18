import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import { applicationMessagePrefix } from '../entities/applicationMessagePrefix'
import { AuthorizedMessage } from '../entities/AuthorizedMessage'
import { Cleavage } from '../entities/Cleavage'
import { MessageForPlayer } from '../entities/MessageForPlayer'
import { PlayerCleave } from '../entities/PlayerCleave'
import { dontKnowWhatToDoWithThatMessage } from '../entities/playerMessages'
import type { ApplicationEvent } from '../events/GameEvent'
import { PlayerApplauseEvent } from '../events/playerApplause/PlayerApplauseEvent'
import { PlayerAskForHelpEvent } from '../events/playerAskForHelp/PlayerAskForHelpEvent'
import { PlayerCleaveEvent } from '../events/playerCleave/PlayerCleaveEvent'
import { PlayerHyperLikeEvent } from '../events/playerHyperLike/PlayerHyperLikeEvent'
import type { PlayerMessageEvent } from '../events/playerMessage/PlayerMessageEvent'
import { PlayerShootEvent } from '../events/playerShoot/PlayerShootEvent'
import { PlayerWhistleEvent } from '../events/playerWhistle/PlayerWhistleEvent'
import { PlayerSuggestCleavageEvent } from '../events/suggestCleavage/PlayerSuggestCleavageEvent'
import { UseCase } from './UseCase'

interface PlayerMessageUseCaseApplicationServices {
    event:EventApplicationService
    chat:ChatApplicationService
}

export class PlayerMessageUseCase extends UseCase {
    constructor (
        private applicationServices:PlayerMessageUseCaseApplicationServices
    ) { super() }

    execute (event: PlayerMessageEvent): Promise<void> {
        return event.message.startsWith(applicationMessagePrefix)
            ? this.onApplicationEvent(event.username, event.message)
            : Promise.resolve()
    }

    private onApplicationEvent (username: string, message: string): Promise<void> {
        const applicationEvent = this.applicationEventStrategies(message, username).get(true)
        return applicationEvent
            ? this.applicationServices.event.sentEvent(applicationEvent)
            : this.applicationServices.chat.sendMessageToPlayer(new MessageForPlayer(username, dontKnowWhatToDoWithThatMessage(username)))
    }

    private applicationEventStrategies (message: string, username: string): Map<boolean, ApplicationEvent> {
        return new Map([
            [message === applicationMessagePrefix + AuthorizedMessage.SHORT_APPLAUSE, new PlayerApplauseEvent()],
            [message === applicationMessagePrefix + AuthorizedMessage.SHORT_WHISTLE, new PlayerWhistleEvent()],
            [message === applicationMessagePrefix + AuthorizedMessage.SHORT_HYPERLIKE, new PlayerHyperLikeEvent()],
            [message === applicationMessagePrefix + AuthorizedMessage.SHORT_SHOOT, new PlayerShootEvent()],
            [message === applicationMessagePrefix + AuthorizedMessage.RIGHT, new PlayerCleaveEvent(username, PlayerCleave.RIGHT)],
            [message === applicationMessagePrefix + AuthorizedMessage.LEFT, new PlayerCleaveEvent(username, PlayerCleave.LEFT)],
            [message === applicationMessagePrefix + AuthorizedMessage.HELP, new PlayerAskForHelpEvent(username)],
            [message === applicationMessagePrefix + AuthorizedMessage.SHORT_HELP, new PlayerAskForHelpEvent(username)],
            [message.startsWith(applicationMessagePrefix + AuthorizedMessage.SUGGEST_CLEAVAGE), new PlayerSuggestCleavageEvent(username, this.newCleavageFromMessage(message))]
        ])
    }

    private newCleavageFromMessage (message: string): Cleavage {
        return new Cleavage({
            title: message.replace(applicationMessagePrefix + AuthorizedMessage.SUGGEST_CLEAVAGE, '').trimStart(),
            leftChoice: { name: 'Gôche', players: [] },
            rightChoice: { name: 'Drouate', players: [] },
            players: []
        })
    }
}
