import type { Cleavage } from '../../../domain/entities/Cleavage'
import type { CleavageRepository } from '../../../domain/ports/CleavageRepository'

export class InMemoryCleavageRepository implements CleavageRepository {
    isPublicCleavageExistByTitle (cleavage: Cleavage): Promise<boolean> {
        return Promise.resolve(this.publicCleavages.some(publicCleavage => publicCleavage.title === cleavage.title))
    }

    addPublicCleavage (cleavage: Cleavage): Promise<void> {
        this.publicCleavages.push(cleavage)
        return Promise.resolve()
    }

    nextPublicCleavage (): Promise<Cleavage|undefined> {
        return Promise.resolve(this.publicCleavages.shift())
    }

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

    publicCleavages: Cleavage[] = []
    cleavage?: Cleavage;
}
