import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { StreamersApplicationService } from '../applicationServices/StreamerApplicationService'
import type { ApplicationEvent } from '../events/GameEvent'
import { UseCase } from './UseCase'

interface RefreshRegisteredStreamersUseCaseApplicationServices {
    streamers:StreamersApplicationService
    interface:InterfaceApplicationService
}

export class RefreshRegisteredStreamersUseCase extends UseCase {
    constructor (private applicationServices:RefreshRegisteredStreamersUseCaseApplicationServices) { super() }
    execute (event: ApplicationEvent): Promise<void> {
        return this.applicationServices.streamers.retrieveAllStreamers()
            .then(streamers => this.applicationServices.interface.updateRegisteredStreamers(streamers))
            .catch(error => Promise.reject(error))
    }
}
