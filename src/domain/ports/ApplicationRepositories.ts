import type { InMemoryCleavageRepository } from '../../infra/repositories/cleavage/InMemoryCleavageRepository'
import type { CleavageRepository } from './CleavageRepository'
import type { InMemoryPlayerRepository } from '../../infra/repositories/player/InMemoryPlayerRepository'
import type { PlayerRepository } from './PlayerRepository'

export interface ApplicationRepositories {
    cleavage: CleavageRepository;
    player:PlayerRepository
}
export interface FakeApplicationRepositories extends ApplicationRepositories {
    player: InMemoryPlayerRepository;
    cleavage: InMemoryCleavageRepository;
}
export interface ProductionApplicationRepositories extends ApplicationRepositories {
    cleavage: InMemoryCleavageRepository;
    player: InMemoryPlayerRepository;
}
