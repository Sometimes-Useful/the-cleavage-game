import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import type { ApplicationEvent } from '../events/GameEvent'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { InterfaceView } from '../entities/InterfaceView'
import { UseCase } from './UseCase'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import { NavigateEvent } from '../events/navigateEvent/NavigateEvent'

export class NewCleavage extends UseCase {
    constructor (
        private interfaceApplicationService: InterfaceApplicationService,
        private chatApplicationService:ChatApplicationService,
        private eventApplicationService:EventApplicationService
    ) {
        super()
    }

    execute (event: ApplicationEvent): Promise<void> {
        return this.chatApplicationService.isConnected()
            .then(isConnected => isConnected
                ? this.onConnected()
                : this.eventApplicationService.sentEvent(new NavigateEvent(InterfaceView.CONNECT_CHAT))
            )
            .catch(error => Promise.reject(error))
    }

    private onConnected (): void | PromiseLike<void> {
        return this.interfaceApplicationService.newCleavage()
            .then(() => this.eventApplicationService.sentEvent(new NavigateEvent(InterfaceView.NEW_CLEAVAGE)))
            .catch(error => Promise.reject(error))
    }
}
