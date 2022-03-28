import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import type { ApplicationEvent } from '../events/GameEvent'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { InterfaceView } from '../entities/InterfaceView'
import { UseCase } from './UseCase'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import { NavigateEvent } from '../events/navigateEvent/NavigateEvent'
import type { AutoplayApplicationService } from '../applicationServices/AutoplayApplicationService'
import { DrawCleavageEvent } from '../events/drawCleavage/DrawCleavageEvent'
import { ChangeGamePhaseEvent } from '../events/changeGamePhase/ChangeGamePhaseEvent'
import { GamePhase } from '../entities/GamePhase'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
export interface NewCleavageUseCaseApplicationServices {
    autoplay: AutoplayApplicationService
    interface: InterfaceApplicationService,
    chat:ChatApplicationService,
    event:EventApplicationService,
    cleavage: CleavageApplicationService
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
            .then(() => Promise.all([
                this.applicationServices.autoplay.hasAutoplay(),
                this.applicationServices.interface.retrieveCurrentView(),
                this.applicationServices.cleavage.retrieveCurrentGamePhase()
            ]))
            .then(([hasAutoplay, currentView, currentGamePhase]) => this.applicationServices.event.sentEvents([
                ...currentGamePhase === GamePhase.NEW_CLEAVAGE ? [] : [new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE)],
                ...currentView !== InterfaceView.GAME ? [new NavigateEvent(InterfaceView.GAME)] : [],
                ...hasAutoplay ? [new DrawCleavageEvent()] : []
            ]))
            .catch(error => Promise.reject(error))
    }
}
