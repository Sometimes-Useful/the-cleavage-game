import type { Cleavage } from '../entities/Cleavage'

export interface CleavageRepository {
    hasCleavage(): Promise<boolean>;
    load():Promise<Cleavage>;
    save(cleavage: Cleavage): Promise<void>;
}
