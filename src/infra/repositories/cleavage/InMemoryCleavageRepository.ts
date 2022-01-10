import type { Cleavage } from '../../../domain/entities/Cleavage'
import type { CleavageRepository } from '../../../domain/ports/CleavageRepository'

export class InMemoryCleavageRepository implements CleavageRepository {
    hasCleavage (): Promise<boolean> {
        return Promise.resolve(!!this.cleavage)
    }

    load (): Promise<Cleavage> {
        return this.cleavage
            ? Promise.resolve(this.cleavage)
            : Promise.reject(new Error('Cleavage is undefined.'))
    }

    save (cleavage: Cleavage): Promise<void> {
        this.cleavage = cleavage
        return Promise.resolve()
    }

    cleavage?: Cleavage;
}
