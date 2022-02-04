import type { Cleavage } from '../../../domain/entities/Cleavage'
import type { GlobalCleavageDrawPileRepository } from '../../../domain/ports/secondary/repositories/GlobalCleavageDrawPileRepository'

export class InMemoryGlobalCleavageDrawPileRepository implements GlobalCleavageDrawPileRepository {
    constructor (
        public globalCleavages: Cleavage[] = []
    ) {}

    retrieveGlobalCleavageByIndex (cleavageIndex: number) {
        const cleavage = this.globalCleavages[cleavageIndex]
        return cleavage ? Promise.resolve(cleavage) : Promise.reject(new Error(`No cleavage at index ${cleavageIndex}`))
    }

    globalCleavageQuantity (): Promise<number> {
        return Promise.resolve(this.globalCleavages.length)
    }

    save (cleavage: Cleavage): Promise<void> {
        this.globalCleavages.push(cleavage)
        return Promise.resolve()
    }

    hasCleavage (cleavage: Cleavage): Promise<boolean> {
        const hasCleavage = this.globalCleavages.some(globalCleavage => globalCleavage.title === cleavage.title)
        return Promise.resolve(hasCleavage)
    }
}
