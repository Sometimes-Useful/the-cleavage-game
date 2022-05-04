import type { StreamersApplicationService } from '../applicationServices/StreamerApplicationService'
import type { RegisterStreamerEvent } from '../events/registerStreamer/RegisterStreamerEvent'
import { UseCase } from './UseCase'

interface RegisterStreamerUseCaseApplicationServices {
    streamers: StreamersApplicationService
}

export class RegisterStreamerUseCase extends UseCase {
    constructor (
        private applicationServices:RegisterStreamerUseCaseApplicationServices
    ) { super() }

    execute (event: RegisterStreamerEvent): Promise<void> {
        return this.applicationServices.streamers.registerStreamer(event.username)
    }
}
