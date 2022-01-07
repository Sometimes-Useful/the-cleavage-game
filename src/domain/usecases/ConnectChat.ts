import type { ApplicationEvent } from '../events/GameEvent'
import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { UseCase } from './UseCase'

export class ConnectChat extends UseCase {
    constructor (private chatApplicationService: ChatApplicationService) {
        super()
    }

    execute (event: ApplicationEvent): Promise<void> {
        return this.chatApplicationService.connectChat()
    }
}
