import type { AutoplayRepository } from '../../../domain/ports/secondary/repositories/AutoplayRepository'
import { nexAutoplayDateIsUndefined } from '../../../messages/infra'

export class InMemoryAutoplayRepository implements AutoplayRepository {
    configureNextAutoPlay (date: Date | null): Promise<void> {
        this.nextCleavageDate = date || undefined
        return Promise.resolve()
    }

    configureAutoplayInterval (autoplayMinutes: number): Promise<void> {
        this.autoplayInterval = autoplayMinutes
        return Promise.resolve()
    }

    retreiveAutoplayInterval (): Promise<number> {
        return Promise.resolve(this.autoplayInterval)
    }

    retrieveNextAutoPlayDate (): Promise<Date> {
        return this.nextCleavageDate
            ? Promise.resolve(this.nextCleavageDate)
            : Promise.reject(new Error(nexAutoplayDateIsUndefined))
    }

    hasAutoplay (): Promise<boolean> {
        return Promise.resolve(this.nextCleavageDate !== undefined)
    }

    nextCleavageDate: Date|undefined
    autoplayInterval: number = 0
}
