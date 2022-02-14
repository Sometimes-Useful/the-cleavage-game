import type { Cleavage } from '../../../entities/Cleavage'

export interface GlobalCleavageDrawPileGateway {
    drawGlobalCleavage(): Promise<Cleavage | undefined>;
    save(cleavage: Cleavage): Promise<void>;
}
