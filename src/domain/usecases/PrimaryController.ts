import type { UseCase } from './UseCase'
import { ConnectChat } from './ConnectChat'
import { EventType } from '../events/EventType'
import { DisconnectChat } from './DisconnectChat'
import { NewCleavage } from './NewCleavage'
import { LaunchCleavage } from './LaunchCleavage'
import { PlayerMessage } from './PlayerMessage'
import { PlayerCleaveUseCase } from './PlayerCleaveUseCase'
import type { ApplicationEvent } from '../events/GameEvent'
import type { ApplicationServices } from '../ports/ApplicationServices'
import { PublicCleavageUseCase } from './PublicCleavageUseCase'
import { SuggestCleavageUseCase } from './SuggestCleavageUseCase'
import { AskForHelpUseCase } from './AskForHelpUseCase'
import { CancelCleavageUseCase } from './CancelCleavageUseCase'
import { PlayerApplauseUseCase } from './PlayerApplauseEvent'
import { PlayerShootUseCase } from './PlayerShootUseCase'
import { PlayerWhistleUseCase } from './PlayerWhistleUseCase'
import { PlayerHyperLikeUseCase } from './PlayerHyperLikeUseCase'
import { ApplicationStartUseCase } from './ApplicationStartUseCase'
import { NavigateUseCase } from './NavigateUseCase'

export class PrimaryController {
    constructor (private applicationServices:ApplicationServices) {
        this.useCases.set(EventType.DISCONNECT_CHAT, new DisconnectChat(this.applicationServices.chat))
        this.useCases.set(EventType.CONNECT_CHAT, new ConnectChat(this.applicationServices.chat, this.applicationServices.interface, this.applicationServices.event))
        this.useCases.set(EventType.NEW_CLEAVAGE, new NewCleavage(this.applicationServices.interface, this.applicationServices.chat, this.applicationServices.event))
        this.useCases.set(EventType.LAUNCH_CLEAVAGE, new LaunchCleavage(this.applicationServices.interface, this.applicationServices.chat, this.applicationServices.cleavage, this.applicationServices.event))
        this.useCases.set(EventType.PLAYER_MESSAGE, new PlayerMessage(this.applicationServices.event, this.applicationServices.chat))
        this.useCases.set(EventType.PLAYER_CLEAVE, new PlayerCleaveUseCase(this.applicationServices.cleavage, this.applicationServices.chat, this.applicationServices.interface))
        this.useCases.set(EventType.PUBLIC_CLEAVAGE, new PublicCleavageUseCase(this.applicationServices.cleavage, this.applicationServices.interface))
        this.useCases.set(EventType.PLAYER_SUGGEST_CLEAVAGE, new SuggestCleavageUseCase(this.applicationServices.chat, this.applicationServices.cleavage))
        this.useCases.set(EventType.PLAYER_ASK_FOR_HELP, new AskForHelpUseCase(this.applicationServices.chat))
        this.useCases.set(EventType.CANCEL_CLEAVAGE, new CancelCleavageUseCase(this.applicationServices.interface))
        this.useCases.set(EventType.PLAYER_APPLAUSE, new PlayerApplauseUseCase(this.applicationServices.interface))
        this.useCases.set(EventType.PLAYER_HYPERLIKE, new PlayerHyperLikeUseCase(this.applicationServices.interface))
        this.useCases.set(EventType.PLAYER_WHISTLE, new PlayerWhistleUseCase(this.applicationServices.interface))
        this.useCases.set(EventType.PLAYER_SHOOT, new PlayerShootUseCase(this.applicationServices.interface))
        this.useCases.set(EventType.APPLICATION_START, new ApplicationStartUseCase(this.applicationServices.event))
        this.useCases.set(EventType.NAVIGATE, new NavigateUseCase(this.applicationServices.interface))
    }

    executeEvent (event: ApplicationEvent): Promise<void> {
        const usecase = this.useCases.get(event.eventType)
        return usecase ? usecase.execute(event) : Promise.reject(new Error(`Event '${event.eventType}' is not supported by application.`))
    }

    private useCases: Map<EventType, UseCase> = new Map()
}
