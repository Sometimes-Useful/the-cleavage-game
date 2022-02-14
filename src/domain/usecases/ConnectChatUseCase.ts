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

interface ConnectChatUseCaseApplicationServices {
    chat:ChatApplicationService
    interface:InterfaceApplicationService
    event:EventApplicationService
}

export class ConnectChatUseCase extends UseCase {
    constructor (
        private applicationServices: ConnectChatUseCaseApplicationServices
    ) { super() }

    execute (event: ConnectChatEvent): Promise<void> {
        return this.applicationServices.chat.isConnected()
            .then(isConnected => !isConnected
                ? this.onDisconnected(event)
                : this.applicationServices.interface.notify(alreadyConnectedToChatNotification)
            )
            .catch(error => Promise.reject(error))
    }

    private onDisconnected (event: ConnectChatEvent): Promise<void> {
        return this.applicationServices.chat.connectChat(event.username, event.token, event.channel)
            .then(() => this.onConnected())
            .catch(error => Promise.reject(error))
    }

    private onConnected (): Promise<void> {
        return Promise.all([
            this.applicationServices.event.sentEvent(new NavigateEvent(InterfaceView.NEW_CLEAVAGE)),
            this.applicationServices.chat.sendMessage(new WelcomeMessage()),
            this.applicationServices.interface.playMusic(mainMusic)
        ])
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }
}
