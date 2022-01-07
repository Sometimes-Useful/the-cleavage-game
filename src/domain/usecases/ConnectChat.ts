import { ApplicationEvent } from '../events/GameEvent'
import { UseCase } from './UseCase'
import { ChatApplicationService } from '../applicationServices/ChatApplicationService'

export class ConnectChat extends UseCase {
    constructor (private chatApplicationService: ChatApplicationService) {
        super()
    }

    execute (event: ApplicationEvent): Promise<void> {
        return this.chatApplicationService.connectChat()
    }
}
