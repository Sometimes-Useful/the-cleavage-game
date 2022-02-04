import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import type { DisconnectChatEvent } from '../events/disconnectChat.spec.ts/DisconnectChatEvent'
import { UseCase } from './UseCase'

interface DisconnectChatUseCaseApplicationServices {
    chat: ChatApplicationService
}

export class DisconnectChatUseCase extends UseCase {
    constructor (
        private applicationServices:DisconnectChatUseCaseApplicationServices
    ) { super() }

    execute (event: DisconnectChatEvent): Promise<void> {
        return this.applicationServices.chat.disconnectChat()
    }
}
