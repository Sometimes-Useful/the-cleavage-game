import { alreadyConnectedToChatNotification, alreadyDisconnectedToChatNotification } from '../entities/notification/notifications'
import { NotificationGateway } from '../ports/NotificationGateway'
import { ChatGateway } from '../ports/ChatGateway'
import { MessageForPlayer } from '../entities/MessageForPlayer'

export class ChatApplicationService {
    constructor (
        private chatGateway: ChatGateway,
        private notificationGateway: NotificationGateway
    ) {}

    sendMessageToPlayer (messageForPlayer: MessageForPlayer): Promise<void> {
        return this.chatGateway.sendMessageToPlayer(messageForPlayer)
    }

    isConnected () {
        return this.chatGateway.isConnected()
    }

    connectChat (): Promise<void> {
        return this.isConnected()
            .then(isConnected => !isConnected ? this.chatGateway.connect() : this.notificationGateway.notify(alreadyConnectedToChatNotification))
    }

    disconnectChat (): Promise<void> {
        return this.isConnected()
            .then(isConnected => isConnected ? this.chatGateway.disconnect() : this.notificationGateway.notify(alreadyDisconnectedToChatNotification))
    }
}
