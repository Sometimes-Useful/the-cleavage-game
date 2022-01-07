import { InMemoryCleavageRepository } from "../../infra/repositories/cleavage/InMemoryCleavageRepository";
import { CleavageRepository } from './CleavageRepository';

export interface ApplicationRepositories {
    cleavage: CleavageRepository;
}
export interface FakeApplicationRepositories extends ApplicationRepositories {
    cleavage: InMemoryCleavageRepository;
}
export interface ProductionApplicationRepositories extends ApplicationRepositories {
    cleavage: InMemoryCleavageRepository;
}
