import type { Cleavage } from '../../../domain/entities/Cleavage'
import type { GlobalCleavageDrawPileGateway } from '../../../domain/ports/secondary/gateways/GlobalCleavageDrawPileGateway'

export class FakeGlobalCleavageDrawPileGateway implements GlobalCleavageDrawPileGateway {
    drawGlobalCleavage (): Promise<Cleavage | undefined> {
        return Promise.resolve(this.globalCleavageDrawPile[0])
    }

    save (cleavage: Cleavage): Promise<void> {
        this.globalCleavageDrawPile.push(cleavage)
        return Promise.resolve()
    }

    globalCleavageDrawPile: Cleavage[] = [];
}
