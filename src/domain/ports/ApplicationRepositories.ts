import type { InMemoryCleavageRepository } from '../../infra/repositories/cleavage/InMemoryCleavageRepository'
import type { CleavageRepository } from './CleavageRepository'

export interface ApplicationRepositories {
    cleavage: CleavageRepository;
}
export interface FakeApplicationRepositories extends ApplicationRepositories {
    cleavage: InMemoryCleavageRepository;
}
export interface ProductionApplicationRepositories extends ApplicationRepositories {
    cleavage: InMemoryCleavageRepository;
}
