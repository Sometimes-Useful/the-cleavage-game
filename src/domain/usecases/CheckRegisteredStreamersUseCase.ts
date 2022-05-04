import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { StreamersApplicationService } from '../applicationServices/StreamerApplicationService'
import type { CheckRegisteredStreamerEvent } from '../events/checkRegisteredStreamer/CheckRegisteredStreamerEvent'
import { UseCase } from './UseCase'

interface CheckRegisteredStreamerUseCaseApplicationServices {
    streamers:StreamersApplicationService
    interface:InterfaceApplicationService
}

export class CheckRegisteredStreamerUseCase extends UseCase {
    constructor (private applicationServices:CheckRegisteredStreamerUseCaseApplicationServices) { super() }
    execute (event: CheckRegisteredStreamerEvent): Promise<void> {
        return this.applicationServices.streamers.isStreamerRegistered(event.username)
            .then(isStreamerRegistered => this.applicationServices.interface.updateStreamerRegistered(isStreamerRegistered))
            .catch(error => Promise.reject(error))
    }
}
