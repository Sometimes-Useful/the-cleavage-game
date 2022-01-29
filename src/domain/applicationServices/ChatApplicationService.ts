import type { Message } from '../entities/message'
import type { MessageForPlayer } from '../entities/MessageForPlayer'
import { alreadyDisconnectedToChatNotification } from '../entities/notification/notifications'
import type { ChatGateway } from '../ports/secondary/gateways/ChatGateway'
import type { InterfaceGateway } from '../ports/secondary/gateways/InterfaceGateway'

export class ChatApplicationService {
    constructor (
        private chatGateway: ChatGateway,
        private interfaceGateway: InterfaceGateway
    ) {}

    sendMessageToPlayer (messageForPlayer: MessageForPlayer): Promise<void> {
        return this.chatGateway.sendMessageToPlayer(messageForPlayer)
    }

    sendMessage (message: Message): Promise<void> {
        return this.chatGateway.sendMessage(message)
    }

    isConnected () {
        return this.chatGateway.isConnected()
    }

    connectChat (username: string, token: string, channel: string): Promise<void> {
        return this.chatGateway.connect(username, token, channel)
    }

    disconnectChat (): Promise<void> {
        return this.isConnected()
            .then(isConnected => isConnected ? this.chatGateway.disconnect() : this.interfaceGateway.notify(alreadyDisconnectedToChatNotification))
    }
}
