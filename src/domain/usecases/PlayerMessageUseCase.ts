import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import { applicationMessagePrefix } from '../entities/applicationMessagePrefix'
import { AuthorizedMessage } from '../entities/AuthorizedMessage'
import { Cleavage } from '../entities/Cleavage'
import { MessageForPlayer } from '../entities/MessageForPlayer'
import { PlayerCleave } from '../entities/PlayerCleave'
import { dontKnowWhatToDoWithThatMessage, missingTitleMessage, multipleCleaveOptionsAvailable } from '../entities/playerMessages'
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
    cleavage:CleavageApplicationService
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
        return this.applicationServices.cleavage.hasCurrentCleavage()
            .then(hasCurrentCleavage => hasCurrentCleavage ? this.onCurrentCleavage(username, message) : this.applyStrategies(username, this.applicationEventStrategiesWithoutCurrentCleavage(username, message)))
            .catch(error => Promise.reject(error))
    }

    private onCurrentCleavage (username: string, message: string): Promise<void> {
        return this.applicationServices.cleavage.loadCurrentCleavage()
            .then(currentCleavage => {
                const strategies = new Map<boolean, ApplicationEvent|string>()
                for (const [key, value] of this.applicationEventStrategiesWithCurrentCleavage(username, message, currentCleavage).entries())strategies.set(key, value)
                for (const [key, value] of this.applicationEventStrategiesWithoutCurrentCleavage(username, message).entries())strategies.set(key, value)
                return this.applyStrategies(username, strategies)
            })
    }

    private applyStrategies (username: string, strategies:Map<boolean, string | ApplicationEvent>): Promise<void> {
        const applicationEventOrMessage = strategies.get(true)
        return applicationEventOrMessage
            ? typeof applicationEventOrMessage === 'string'
                ? this.applicationServices.chat.sendMessageToPlayer(new MessageForPlayer(username, applicationEventOrMessage))
                : this.applicationServices.event.sentEvent(applicationEventOrMessage)
            : this.applicationServices.chat.sendMessageToPlayer(new MessageForPlayer(username, dontKnowWhatToDoWithThatMessage(username)))
    }

    private applicationEventStrategiesWithCurrentCleavage (username: string, message: string, currentCleavage:Cleavage): Map<boolean, ApplicationEvent|string> {
        const strategies = new Map<boolean, ApplicationEvent|string>()
        strategies.set((applicationMessagePrefix + currentCleavage.rightChoice.name.toLocaleLowerCase()).startsWith(message.toLocaleLowerCase()), new PlayerCleaveEvent(username, PlayerCleave.RIGHT))
        strategies.set((applicationMessagePrefix + currentCleavage.leftChoice.name.toLocaleLowerCase()).startsWith(message.toLocaleLowerCase()), new PlayerCleaveEvent(username, PlayerCleave.LEFT))
        strategies.set((applicationMessagePrefix + currentCleavage.leftChoice.name.toLocaleLowerCase()).startsWith(message.toLocaleLowerCase()) && (applicationMessagePrefix + currentCleavage.rightChoice.name.toLocaleLowerCase()).startsWith(message.toLocaleLowerCase()), multipleCleaveOptionsAvailable(currentCleavage))
        strategies.set(message === applicationMessagePrefix + currentCleavage.leftChoice.name, new PlayerCleaveEvent(username, PlayerCleave.LEFT))
        strategies.set(message === applicationMessagePrefix + currentCleavage.rightChoice.name, new PlayerCleaveEvent(username, PlayerCleave.RIGHT))
        return strategies
    }

    private applicationEventStrategiesWithoutCurrentCleavage (username: string, message: string): Map<boolean, ApplicationEvent|string> {
        const rightOption = 'droite'
        const leftOption = 'gauche'
        const leftNumber = '1'
        const rightNumber = '2'
        const strategies = new Map<boolean, ApplicationEvent|string>()
        strategies.set(message === applicationMessagePrefix + AuthorizedMessage.SHORT_APPLAUSE, new PlayerApplauseEvent())
        strategies.set(message === applicationMessagePrefix + AuthorizedMessage.SHORT_WHISTLE, new PlayerWhistleEvent())
        strategies.set(message === applicationMessagePrefix + AuthorizedMessage.SHORT_HYPERLIKE, new PlayerHyperLikeEvent())
        strategies.set(message === applicationMessagePrefix + AuthorizedMessage.SHORT_SHOOT, new PlayerShootEvent())
        strategies.set(message === applicationMessagePrefix + AuthorizedMessage.RIGHT, new PlayerCleaveEvent(username, PlayerCleave.RIGHT))
        strategies.set(message === applicationMessagePrefix + AuthorizedMessage.LEFT, new PlayerCleaveEvent(username, PlayerCleave.LEFT))
        strategies.set(message === applicationMessagePrefix + AuthorizedMessage.HELP, new PlayerAskForHelpEvent(username))
        strategies.set(message === applicationMessagePrefix + AuthorizedMessage.SHORT_HELP, new PlayerAskForHelpEvent(username))
        strategies.set(message.startsWith(applicationMessagePrefix + AuthorizedMessage.SUGGEST_CLEAVAGE), new PlayerSuggestCleavageEvent(username, this.newCleavageFromMessage(message)))
        strategies.set(message.replace(' ', '') === applicationMessagePrefix + AuthorizedMessage.SUGGEST_CLEAVAGE, missingTitleMessage)
        strategies.set((applicationMessagePrefix + leftOption).toLocaleLowerCase().startsWith(message.toLocaleLowerCase()), new PlayerCleaveEvent(username, PlayerCleave.LEFT))
        strategies.set((applicationMessagePrefix + rightOption).toLocaleLowerCase().startsWith(message.toLocaleLowerCase()), new PlayerCleaveEvent(username, PlayerCleave.RIGHT))
        strategies.set(message === applicationMessagePrefix + leftNumber, new PlayerCleaveEvent(username, PlayerCleave.LEFT))
        strategies.set(message === applicationMessagePrefix + rightNumber, new PlayerCleaveEvent(username, PlayerCleave.RIGHT))
        return strategies
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
