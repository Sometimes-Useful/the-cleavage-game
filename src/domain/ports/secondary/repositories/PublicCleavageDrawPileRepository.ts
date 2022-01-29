import type { Cleavage } from '../../../entities/Cleavage'

export interface PublicCleavageDrawPileRepository {
    isCleavageExistByTitle(cleavage: Cleavage): Promise<boolean>;
    addCleavage(cleavage: Cleavage): Promise<void>;
    nextCleavage(): Promise<Cleavage | undefined>;
}
