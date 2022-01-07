import type { MessageForPlayer } from '../../../domain/entities/MessageForPlayer'
import type { ChatGateway } from '../../../domain/ports/ChatGateway'
export class TwitchChatGateway implements ChatGateway {
    sendMessageToPlayer (messageForPlayer: MessageForPlayer): Promise<void> {
        throw new Error('Method not implemented.')
    }

    disconnect (): Promise<void> {
        throw new Error('Method not implemented.')
    }

    isConnected (): Promise<boolean> {
        return Promise.resolve(true)
    }

    connect (): Promise<void> {
        throw new Error('Method not implemented.')
    }
}
