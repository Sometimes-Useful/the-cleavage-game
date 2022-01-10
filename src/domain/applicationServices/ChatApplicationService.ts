import { alreadyDisconnectedToChatNotification } from '../entities/notification/notifications'
import type { ChatGateway } from '../ports/ChatGateway'
import type { MessageForPlayer } from '../entities/MessageForPlayer'
import type { InterfaceGateway } from '../ports/InterfaceGateway'

export class ChatApplicationService {
    constructor (
        private chatGateway: ChatGateway,
        private interfaceGateway: InterfaceGateway
    ) {}

    sendMessageToPlayer (messageForPlayer: MessageForPlayer): Promise<void> {
        return this.chatGateway.sendMessageToPlayer(messageForPlayer)
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
