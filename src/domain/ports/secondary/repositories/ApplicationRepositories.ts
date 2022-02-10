import type { InMemoryAutoplayRepository } from '../../../../infra/repositories/autoplay/InMemoryAutoplayRepository'
import type { InMemoryCurrentCleavageRepository } from '../../../../infra/repositories/currentCleavage/InMemoryCurrentCleavageRepository'
import type { GcpGlobalCleavageDrawPileRepository } from '../../../../infra/repositories/globalCleavageDrawPile/GcpGlobalCleavageDrawPileRepository'
import type { InMemoryGlobalCleavageDrawPileRepository } from '../../../../infra/repositories/globalCleavageDrawPile/InMemoryGlobalCleavageRepository'
import type { InMemoryPlayerRepository } from '../../../../infra/repositories/player/InMemoryPlayerRepository'
import type { InMemoryPublicCleavageDrawPileRepository } from '../../../../infra/repositories/publicCleavageDrawPile/InMemoryPublicCleavageDrawPileRepository'
import type { AutoplayRepository } from './AutoplayRepository'
import type { CurrentCleavageRepository } from './CurrentCleavageRepository'
import type { GlobalCleavageDrawPileRepository } from './GlobalCleavageDrawPileRepository'
import type { PlayerRepository } from './PlayerRepository'
import type { PublicCleavageDrawPileRepository } from './PublicCleavageDrawPileRepository'

export interface ClientApplicationRepositories {
    autoplay:AutoplayRepository
    publicCleavageDrawPile: PublicCleavageDrawPileRepository;
    currentCleavage:CurrentCleavageRepository
    player:PlayerRepository
}
export interface FakeClientApplicationRepositories extends ClientApplicationRepositories {
    autoplay: InMemoryAutoplayRepository
    publicCleavageDrawPile: InMemoryPublicCleavageDrawPileRepository;
    currentCleavage:InMemoryCurrentCleavageRepository;
    player: InMemoryPlayerRepository;

}
export interface ProductionClientApplicationRepositories extends ClientApplicationRepositories {
    autoplay: InMemoryAutoplayRepository
    publicCleavageDrawPile: InMemoryPublicCleavageDrawPileRepository;
    currentCleavage:InMemoryCurrentCleavageRepository;
    player: InMemoryPlayerRepository;
}

export interface ServerApplicationRepositories {
    globalCleavageDrawPileRepository:GlobalCleavageDrawPileRepository
}
export interface FakeServerApplicationRepositories extends ServerApplicationRepositories {
    globalCleavageDrawPileRepository: InMemoryGlobalCleavageDrawPileRepository

}
export interface ProductionServerApplicationRepositories extends ServerApplicationRepositories {
    globalCleavageDrawPileRepository: GcpGlobalCleavageDrawPileRepository
}
