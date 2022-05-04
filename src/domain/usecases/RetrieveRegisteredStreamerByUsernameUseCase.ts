import type { StreamerDto } from '../entities/StreamerDto'
import type { ServerApplicationServices } from '../ports/ApplicationServices'

export class RetrieveRegisteredStreamerByUsernameUseCase {
    constructor (private applicationServices: ServerApplicationServices, private username: string) { }
    execute (): Promise<StreamerDto|undefined> {
        return this.applicationServices.globalStreamers.registeredStreamerByUsername(this.username)
    }
}
