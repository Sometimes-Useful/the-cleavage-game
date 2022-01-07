import { Cleavage } from "../../../domain/entities/Cleavage";
import { CleavageRepository } from "../../../domain/ports/CleavageRepository";


export class InMemoryCleavageRepository implements CleavageRepository {
    load(): Promise<Cleavage> {
        return this.cleavage
            ? Promise.resolve(this.cleavage)
            : Promise.reject(new Error("Cleavage is undefined."));
    }
    save(cleavage: Cleavage): Promise<void> {
        console.log("Cleavage saved.");
        this.cleavage = cleavage;
        return Promise.resolve();
    }
    cleavage?: Cleavage;
}
