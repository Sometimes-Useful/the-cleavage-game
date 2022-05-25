import type { Cleavage } from '../../entities/Cleavage'
import type { StreamerDto } from '../../entities/StreamerDto'
import { DrawGlobalCleavageDrawPileUseCase } from '../../usecases/DrawGlobalCleavageDrawPileUseCase'
import { RetrieveCleavageDrawpileQuantityUseCase } from '../../usecases/RetrieveCleavageDrawpileQuantityUseCase'
import { RetrieveRegisteredStreamerByUsernameUseCase } from '../../usecases/RetrieveRegisteredStreamerByUsernameUseCase'
import { RetrieveRegisteredStreamersUseCase } from '../../usecases/RetrieveRegisteredStreamersUseCase'
import type { ServerApplicationServices } from '../ApplicationServices'

export class PrimaryServerQueryController {
    constructor (private applicationServices: ServerApplicationServices) {}
    retrieveAllRegisteredStreamers ():Promise<StreamerDto[]> {
        return new RetrieveRegisteredStreamersUseCase(this.applicationServices).execute()
    }

    drawGlobalCleavageDrawPile ():Promise<Cleavage|undefined> {
        return new DrawGlobalCleavageDrawPileUseCase(this.applicationServices).execute()
    }

    retrieveCleavageDrawpileQuantity ():Promise<number> {
        return new RetrieveCleavageDrawpileQuantityUseCase(this.applicationServices).execute()
    }

    retrieveRegisteredStreamerByUsername (username: string):Promise<StreamerDto|undefined> {
        return new RetrieveRegisteredStreamerByUsernameUseCase(this.applicationServices, username).execute()
    }
}
