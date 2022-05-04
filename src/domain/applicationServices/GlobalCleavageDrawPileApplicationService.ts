import type { Cleavage } from '../entities/Cleavage'
import type { RandomGateway } from '../ports/secondary/gateways/RandomGateway'
import type { GlobalCleavageDrawPileRepository } from '../ports/secondary/repositories/GlobalCleavageDrawPileRepository'

export class GlobalCleavageDrawPileApplicationService {
    retrieveCleavageDrawPileQuantity (): Promise<number> {
        return this.globalCleavageDrawPileRepository.globalCleavageQuantity()
    }

    constructor (
        private globalCleavageDrawPileRepository: GlobalCleavageDrawPileRepository,
        private randomGateway: RandomGateway
    ) { }

    save (cleavage: Cleavage): Promise<void> {
        return this.globalCleavageDrawPileRepository.hasCleavage(cleavage)
            .then(hasCleavage => hasCleavage
                ? Promise.resolve()
                : this.globalCleavageDrawPileRepository.save(cleavage)
            )
            .catch(error => Promise.reject(error))
    }

    draw (): Promise<Cleavage | undefined> {
        return this.globalCleavageDrawPileRepository.globalCleavageQuantity()
            .then(globalCleavageQuantity => globalCleavageQuantity === 0
                ? Promise.resolve(undefined)
                : this.onGlobalCleavage(globalCleavageQuantity)
            )
            .catch(error => Promise.reject(error))
    }

    onGlobalCleavage (globalCleavageQuantity: number): Promise<Cleavage> {
        return this.randomGateway.randomIntegerOnRange(1, globalCleavageQuantity)
            .then(cleavagePosition => this.globalCleavageDrawPileRepository.retrieveGlobalCleavageByIndex(cleavagePosition - 1))
            .catch(error => Promise.reject(error))
    }
}
