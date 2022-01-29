import type { Cleavage } from '../../../domain/entities/Cleavage'
import type { PublicCleavageDrawPileRepository } from '../../../domain/ports/secondary/repositories/PublicCleavageDrawPileRepository'

export class InMemoryPublicCleavageDrawPileRepository implements PublicCleavageDrawPileRepository {
    isCleavageExistByTitle (cleavage: Cleavage): Promise<boolean> {
        return Promise.resolve(this.publicCleavages.some(publicCleavage => publicCleavage.title === cleavage.title))
    }

    addCleavage (cleavage: Cleavage): Promise<void> {
        this.publicCleavages.push(cleavage)
        return Promise.resolve()
    }

    nextCleavage (): Promise<Cleavage|undefined> {
        return Promise.resolve(this.publicCleavages.shift())
    }

    publicCleavages: Cleavage[] = []
}
