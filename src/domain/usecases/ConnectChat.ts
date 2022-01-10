import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { UseCase } from './UseCase'
import type { ConnectChatEvent } from '../events/connectChat/ConnectChatEvent'
import { alreadyConnectedToChatNotification } from '../entities/notification/notifications'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { InterfaceView } from '../entities/InterfaceView'

export class ConnectChat extends UseCase {
    constructor (
        private chatApplicationService: ChatApplicationService,
        private interfaceApplicationService: InterfaceApplicationService
    ) {
        super()
    }

    execute (event: ConnectChatEvent): Promise<void> {
        return this.chatApplicationService.isConnected()
            .then(isConnected => !isConnected ? this.onDisconnected(event) : this.interfaceApplicationService.notify(alreadyConnectedToChatNotification))
            .catch(error => Promise.reject(error))
    }

    private onDisconnected (event: ConnectChatEvent): Promise<void> {
        return this.chatApplicationService.connectChat(event.username, event.token, event.channel)
            .then(() => this.interfaceApplicationService.changeView(InterfaceView.NEW_CLEAVAGE))
            .catch(error => Promise.reject(error))
    }
}
