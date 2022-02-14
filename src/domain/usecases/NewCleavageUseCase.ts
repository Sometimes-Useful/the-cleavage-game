import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import type { ApplicationEvent } from '../events/GameEvent'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { InterfaceView } from '../entities/InterfaceView'
import { UseCase } from './UseCase'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import { NavigateEvent } from '../events/navigateEvent/NavigateEvent'
import type { AutoplayApplicationService } from '../applicationServices/AutoplayApplicationService'
import { DrawCleavageEvent } from '../events/drawCleavage/DrawCleavageEvent'
export interface NewCleavageUseCaseApplicationServices {
    autoplay: AutoplayApplicationService
    interface: InterfaceApplicationService,
    chat:ChatApplicationService,
    event:EventApplicationService
}

export class NewCleavageUseCase extends UseCase {
    constructor (
        private applicationServices:NewCleavageUseCaseApplicationServices
    ) { super() }

    execute (event: ApplicationEvent): Promise<void> {
        return this.applicationServices.chat.isConnected()
            .then(isConnected => isConnected
                ? this.onConnected()
                : this.applicationServices.event.sentEvent(new NavigateEvent(InterfaceView.CONNECT_CHAT))
            )
            .catch(error => Promise.reject(error))
    }

    private onConnected (): void | PromiseLike<void> {
        return this.applicationServices.interface.newCleavage()
            .then(() => this.applicationServices.autoplay.hasAutoplay())
            .then(hasAutoplay => this.applicationServices.event.sentEvents([
                new NavigateEvent(InterfaceView.NEW_CLEAVAGE),
                ...(hasAutoplay ? [new DrawCleavageEvent()] : [])
            ]))
            .catch(error => Promise.reject(error))
    }
}
