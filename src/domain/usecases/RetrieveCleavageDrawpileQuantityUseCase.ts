import type { ServerApplicationServices } from '../ports/ApplicationServices'

export class RetrieveCleavageDrawpileQuantityUseCase {
    constructor (private applicationServices: ServerApplicationServices) { }
    execute (): Promise<number> {
        return this.applicationServices.globalCleavageDrawPile.retrieveCleavageDrawPileQuantity()
    }
}
