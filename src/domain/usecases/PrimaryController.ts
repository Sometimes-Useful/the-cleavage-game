import type { UseCase } from './UseCase'
import type { ApplicationEvent } from '../events/GameEvent'
import type { ApplicationServices } from '../ports/ApplicationServices'
import { ConnectChat } from './ConnectChat'
import { EventType } from '../events/EventType'
import { DisconnectChat } from './DisconnectChat'
import { NewCleavage } from './NewCleavage'
import { LaunchCleavage } from './LaunchCleavage'
import { PlayerMessage } from './PlayerMessage'
import { PlayerCleaveUseCase } from './PlayerCleaveUseCase'

export class PrimaryController {
    constructor (private applicationServices:ApplicationServices) {
        this.useCases.set(EventType.DISCONNECT_CHAT, new DisconnectChat(this.applicationServices.chat))
        this.useCases.set(EventType.CONNECT_CHAT, new ConnectChat(this.applicationServices.chat))
        this.useCases.set(EventType.NEW_CLEAVAGE, new NewCleavage(this.applicationServices.interface, this.applicationServices.chat))
        this.useCases.set(EventType.LAUNCH_CLEAVAGE, new LaunchCleavage(this.applicationServices.interface, this.applicationServices.chat, this.applicationServices.cleavage))
        this.useCases.set(EventType.PLAYER_MESSAGE, new PlayerMessage(this.applicationServices.event, this.applicationServices.chat))
        this.useCases.set(EventType.PLAYER_CLEAVE, new PlayerCleaveUseCase(this.applicationServices.cleavage))
    }

    executeEvent (event: ApplicationEvent): Promise<void> {
        const usecase = this.useCases.get(event.eventType)
        return usecase ? usecase.execute(event) : Promise.reject(new Error(`No event '${event.eventType}' not supported.`))
    }

    private useCases: Map<EventType, UseCase> = new Map()
}
