import { Cleavage } from '../entities/Cleavage'

export interface CleavageRepository {
    load():Promise<Cleavage>;
    save(cleavage: Cleavage): Promise<void>;
}
