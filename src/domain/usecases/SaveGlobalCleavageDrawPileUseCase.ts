import type { GlobalCleavageDrawPileApplicationService } from '../applicationServices/GlobalCleavageDrawPileApplicationService'
import type { SaveCleavageOnGlobalCleavageDrawPileEvent } from '../events/saveCleavageOnGlobalCleavageDrawPile/SaveCleavageOnGlobalCleavageDrawPileEvent'
import { UseCase } from './UseCase'

interface SaveGlobalCleavageDrawPileUseCaseApplicationServices {
    globalCleavageDrawPile:GlobalCleavageDrawPileApplicationService
}
export class SaveGlobalCleavageDrawPileUseCase extends UseCase {
    constructor (
        private applicationServices:SaveGlobalCleavageDrawPileUseCaseApplicationServices
    ) { super() }

    execute (event: SaveCleavageOnGlobalCleavageDrawPileEvent):Promise<void> {
        return this.applicationServices.globalCleavageDrawPile.save(event.cleavage)
    }
}
