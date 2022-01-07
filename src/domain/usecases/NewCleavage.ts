import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import type { ApplicationEvent } from '../events/GameEvent'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { InterfaceView } from '../entities/InterfaceView'
import { UseCase } from './UseCase'

export class NewCleavage extends UseCase {
    constructor (private interfaceApplicationService: InterfaceApplicationService, private chatApplicationService:ChatApplicationService) {
        super()
    }

    execute (event: ApplicationEvent): Promise<void> {
        return this.chatApplicationService.isConnected()
            .then(isConnected => isConnected
                ? this.interfaceApplicationService.changeView(InterfaceView.NEW_CLEAVAGE)
                : this.interfaceApplicationService.changeView(InterfaceView.CONNECT_CHAT)
            )
            .catch(error => Promise.reject(error))
    }
}
