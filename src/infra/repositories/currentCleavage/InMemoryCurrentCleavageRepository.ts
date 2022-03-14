import type { Cleavage } from '../../../domain/entities/Cleavage'
import type { CurrentCleavageRepository } from '../../../domain/ports/secondary/repositories/CurrentCleavageRepository'
import { cleavageUndefined } from '../../../messages/infra'

export class InMemoryCurrentCleavageRepository implements CurrentCleavageRepository {
    hasCleavage (): Promise<boolean> {
        return Promise.resolve(!!this.cleavage)
    }

    load (): Promise<Cleavage> {
        return this.cleavage
            ? Promise.resolve(this.cleavage)
            : Promise.reject(new Error(cleavageUndefined))
    }

    save (cleavage: Cleavage): Promise<void> {
        this.cleavage = cleavage
        return Promise.resolve()
    }

 cleavage?: Cleavage;
}
