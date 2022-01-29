
import type { InMemoryCurrentCleavageRepository } from '../../../../infra/repositories/currentCleavage/InMemoryCurrentCleavageRepository'
import type { InMemoryGlobalCleavageDrawPileRepository } from '../../../../infra/repositories/globalCleavageDrawPile/InMemoryGlobalCleavageRepository'
import type { InMemoryPlayerRepository } from '../../../../infra/repositories/player/InMemoryPlayerRepository'
import type { InMemoryPublicCleavageDrawPileRepository } from '../../../../infra/repositories/publicCleavageDrawPile/InMemoryPublicCleavageDrawPileRepository'
import type { CurrentCleavageRepository } from './CurrentCleavageRepository'
import type { GlobalCleavageDrawPileRepository } from './GlobalCleavageDrawPileRepository'
import type { PlayerRepository } from './PlayerRepository'
import type { PublicCleavageDrawPileRepository } from './PublicCleavageDrawPileRepository'

export interface ApplicationRepositories {
    globalCleavageDrawPile: GlobalCleavageDrawPileRepository
    publicCleavageDrawPile: PublicCleavageDrawPileRepository;
    currentCleavage:CurrentCleavageRepository
    player:PlayerRepository
}
export interface FakeApplicationRepositories extends ApplicationRepositories {
    globalCleavageDrawPile: InMemoryGlobalCleavageDrawPileRepository
    publicCleavageDrawPile: InMemoryPublicCleavageDrawPileRepository;
    currentCleavage:InMemoryCurrentCleavageRepository;
    player: InMemoryPlayerRepository;

}
export interface ProductionApplicationRepositories extends ApplicationRepositories {
    globalCleavageDrawPile: InMemoryGlobalCleavageDrawPileRepository
    publicCleavageDrawPile: InMemoryPublicCleavageDrawPileRepository;
    currentCleavage:InMemoryCurrentCleavageRepository;
    player: InMemoryPlayerRepository;

}
