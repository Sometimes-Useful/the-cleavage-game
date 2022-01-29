import { ChatStatus } from '../../../domain/entities/ChatStatus'
import type { Message } from '../../../domain/entities/message'
import type { MessageForPlayer } from '../../../domain/entities/MessageForPlayer'
import type { ChatGateway } from '../../../domain/ports/secondary/gateways/ChatGateway'

export class FakeChatGateway implements ChatGateway {
    sendMessage (message: Message): Promise<void> {
        this.messages.push(message)
        return Promise.resolve()
    }

    isConnected (): Promise<boolean> {
        return Promise.resolve(this.status === ChatStatus.CONNECTED)
    }

    sendMessageToPlayer (messageForPlayer: MessageForPlayer): Promise<void> {
        this.messagesForPlayer.push(messageForPlayer)
        return Promise.resolve()
    }

    disconnect (): Promise<void> {
        this.status = ChatStatus.DISCONNECTED
        return Promise.resolve()
    }

    connect (): Promise<void> {
        this.status = ChatStatus.CONNECTED
        return Promise.resolve()
    }

    public messagesForPlayer: MessageForPlayer[]=[]
    public messages: Message[] = []
    public status: ChatStatus = ChatStatus.DISCONNECTED
}
