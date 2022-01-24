import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { UseCase } from './UseCase'
import type { ConnectChatEvent } from '../events/connectChat/ConnectChatEvent'
import { alreadyConnectedToChatNotification } from '../entities/notification/notifications'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { InterfaceView } from '../entities/InterfaceView'
import { mainMusic } from '../entities/music/mainMusic'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import { NavigateEvent } from '../events/navigateEvent/NavigateEvent'
import { WelcomeMessage } from '../entities/message'

export class ConnectChat extends UseCase {
    constructor (
        private chatApplicationService: ChatApplicationService,
        private interfaceApplicationService: InterfaceApplicationService,
        private eventApplicationService:EventApplicationService
    ) {
        super()
    }

    execute (event: ConnectChatEvent): Promise<void> {
        return this.chatApplicationService.isConnected()
            .then(isConnected => !isConnected
                ? this.onDisconnected(event)
                : this.interfaceApplicationService.notify(alreadyConnectedToChatNotification))
            .catch(error => Promise.reject(error))
    }

    private onDisconnected (event: ConnectChatEvent): Promise<void> {
        return this.chatApplicationService.connectChat(event.username, event.token, event.channel)
            .then(() => this.onConnected())
            .catch(error => Promise.reject(error))
    }

    private onConnected (): void | PromiseLike<void> {
        return Promise.all([
            this.eventApplicationService.sentEvent(new NavigateEvent(InterfaceView.NEW_CLEAVAGE)),
            this.chatApplicationService.sendMessage(new WelcomeMessage()),
            this.interfaceApplicationService.playMusic(mainMusic)
        ])
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }
}
