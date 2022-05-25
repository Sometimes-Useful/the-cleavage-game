import type { RegisterStreamerServerEvent } from '../events/registerStreamerServer/RegisterStreamerServerEvent'
import type { ServerApplicationServices } from '../ports/ApplicationServices'
import { UseCase } from './UseCase'

export class RegisterStreamerBackendUseCase extends UseCase {
    constructor (private applicationServices: ServerApplicationServices) { super() }
    execute (event: RegisterStreamerServerEvent): Promise<void> {
        return this.applicationServices.globalStreamers.registerStreamer(event.streamer)
    }
}
