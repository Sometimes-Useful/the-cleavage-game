import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import type { ApplicationEvent } from '../events/GameEvent'
import { UseCase } from './UseCase'

export class DisconnectChat extends UseCase {
    constructor (private chatApplicationService: ChatApplicationService) {
        super()
    }

    execute (event: ApplicationEvent): Promise<void> {
        return this.chatApplicationService.disconnectChat()
    }
}
