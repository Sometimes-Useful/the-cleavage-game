import type { ServerApplicationServices } from '../ApplicationServices'
import { DrawGlobalCleavageDrawPileUseCase } from '../../usecases/DrawGlobalCleavageDrawPileUseCase'
import type { Cleavage } from '../../entities/Cleavage'

export class PrimaryServerQueryController {
    constructor (private applicationServices: ServerApplicationServices) {}

    drawGlobalCleavageDrawPile ():Promise<Cleavage|undefined> {
        return new DrawGlobalCleavageDrawPileUseCase(this.applicationServices).execute()
    }
}
