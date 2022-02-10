import type { Cleavage } from '../entities/Cleavage'
import type { GlobalCleavageDrawPileApplicationService } from '../applicationServices/GlobalCleavageDrawPileApplicationService'

interface DrawGlobalCleavageDrawPileUseCaseApplicationServices {
    globalCleavageDrawPile: GlobalCleavageDrawPileApplicationService

}

export class DrawGlobalCleavageDrawPileUseCase {
    constructor (
        private applicationServices:DrawGlobalCleavageDrawPileUseCaseApplicationServices
    ) { }

    execute (): Promise<Cleavage|undefined> {
        return this.applicationServices.globalCleavageDrawPile.draw()
    }
}
