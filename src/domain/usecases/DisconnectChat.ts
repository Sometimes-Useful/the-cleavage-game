import { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { UseCase } from './UseCase'
import { ApplicationEvent } from '../events/GameEvent'

export class DisconnectChat extends UseCase {
    constructor (private chatApplicationService: ChatApplicationService) {
        super()
    }

    execute (event: ApplicationEvent): Promise<void> {
        return this.chatApplicationService.disconnectChat()
    }
}
