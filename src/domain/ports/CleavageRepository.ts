import type { Cleavage } from '../entities/Cleavage'

export interface CleavageRepository {
    isPublicCleavageExistByTitle(cleavage: Cleavage): Promise<boolean>;
    addPublicCleavage(cleavage: Cleavage): Promise<void>;
    nextPublicCleavage(): Promise<Cleavage|undefined>;
    hasCleavage(): Promise<boolean>;
    load():Promise<Cleavage>;
    save(cleavage: Cleavage): Promise<void>;
}
