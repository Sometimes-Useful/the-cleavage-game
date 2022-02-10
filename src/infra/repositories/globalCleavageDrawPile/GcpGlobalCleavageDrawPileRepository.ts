import type { Cleavage } from '../../../domain/entities/Cleavage'
import type { GlobalCleavageDrawPileRepository } from '../../../domain/ports/secondary/repositories/GlobalCleavageDrawPileRepository'

export class GcpGlobalCleavageDrawPileRepository implements GlobalCleavageDrawPileRepository {
    retrieveGlobalCleavageByIndex (globalCleavageIndex: number): Promise<Cleavage> {
        throw new Error('Method not implemented.')
    }

    globalCleavageQuantity (): Promise<number> {
        throw new Error('Method not implemented.')
    }

    save (cleavage: Cleavage): Promise<void> {
        throw new Error('Method not implemented.')
    }

    hasCleavage (cleavage: Cleavage): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
}
