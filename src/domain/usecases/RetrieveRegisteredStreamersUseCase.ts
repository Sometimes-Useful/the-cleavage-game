import type { StreamerDto } from '../entities/StreamerDto'
import type { ServerApplicationServices } from '../ports/ApplicationServices'

export class RetrieveRegisteredStreamersUseCase {
    constructor (private applicationServices: ServerApplicationServices) { }
    execute (): Promise<StreamerDto[]> {
        return this.applicationServices.globalStreamers.registeredStreamers()
    }
}
