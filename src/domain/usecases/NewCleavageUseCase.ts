import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { GamePhase } from '../entities/GamePhase'
import { InterfaceView } from '../entities/InterfaceView'
import { ChangeGamePhaseEvent } from '../events/changeGamePhase/ChangeGamePhaseEvent'
import { NavigateEvent } from '../events/navigateEvent/NavigateEvent'
import type { NewCleavageEvent } from '../events/newCleavage/NewCleavageEvent'
import { VideoExtractStartEvent } from '../events/videoExtractStart/VideoExtractStartEvent'
import { UseCase } from './UseCase'
export interface NewCleavageUseCaseApplicationServices {
    interface: InterfaceApplicationService,
    chat:ChatApplicationService,
    event:EventApplicationService,
    cleavage: CleavageApplicationService
}

export class NewCleavageUseCase extends UseCase {
    constructor (
        private applicationServices:NewCleavageUseCaseApplicationServices
    ) { super() }

    execute (event: NewCleavageEvent): Promise<void> {
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
                this.applicationServices.interface.retrieveCurrentView(),
                this.applicationServices.cleavage.retrieveCurrentGamePhase()
            ]))
            .then(([currentView, currentGamePhase]) => this.applicationServices.event.sentEvents([
                ...currentGamePhase === GamePhase.NEW_CLEAVAGE ? [] : currentView !== InterfaceView.GAME ? [new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE)] : [new VideoExtractStartEvent({ fullRandom: true })],
                ...currentView !== InterfaceView.GAME ? [new NavigateEvent(InterfaceView.GAME)] : []
            ]))
            .catch(error => Promise.reject(error))
    }
}
