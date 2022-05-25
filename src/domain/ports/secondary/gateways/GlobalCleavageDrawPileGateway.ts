import type { Cleavage } from '../../../entities/Cleavage'

export interface GlobalCleavageDrawPileGateway {
    retrieveCleavageDrawpileQuantity(): Promise<number>;
    drawGlobalCleavage(): Promise<Cleavage | undefined>;
    save(cleavage: Cleavage): Promise<void>;
}
