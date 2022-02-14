import type { Cleavage } from '../../../entities/Cleavage'

export interface GlobalCleavageDrawPileRepository {
    retrieveGlobalCleavageByIndex(globalCleavageIndex: number):Promise<Cleavage> ;
    globalCleavageQuantity():Promise<number>;
    save(cleavage: Cleavage): Promise<void>;
    hasCleavage(cleavage: Cleavage): Promise<boolean>;
}
