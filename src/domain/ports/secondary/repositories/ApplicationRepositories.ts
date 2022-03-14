import type { InMemoryAutoplayRepository } from '../../../../infra/repositories/autoplay/InMemoryAutoplayRepository'
import type { InMemoryBarRepository } from '../../../../infra/repositories/bar/InMemoryBarRepository'
import type { InMemoryCurrentCleavageRepository } from '../../../../infra/repositories/currentCleavage/InMemoryCurrentCleavageRepository'
import type { InMemoryGlobalCleavageDrawPileRepository } from '../../../../infra/repositories/globalCleavageDrawPile/InMemoryGlobalCleavageRepository'
import type { InMemoryPlayerRepository } from '../../../../infra/repositories/player/InMemoryPlayerRepository'
import type { InMemoryPublicCleavageDrawPileRepository } from '../../../../infra/repositories/publicCleavageDrawPile/InMemoryPublicCleavageDrawPileRepository'
import type { AutoplayRepository } from './AutoplayRepository'
import type { BarRepository } from './BarRepository'
import type { CurrentCleavageRepository } from './CurrentCleavageRepository'
import type { GamePhaseRepository } from './GamePhaseRepository'
import type { GlobalCleavageDrawPileRepository } from './GlobalCleavageDrawPileRepository'
import type { InMemoryGamePhaseRepository } from '../../../../infra/repositories/gamePhase/InMemoryGamePhaseRepository'

import type { PlayerRepository } from './PlayerRepository'
import type { PublicCleavageDrawPileRepository } from './PublicCleavageDrawPileRepository'

export interface ClientApplicationRepositories {
    gamePhase:GamePhaseRepository
    bar:BarRepository
    autoplay:AutoplayRepository
    publicCleavageDrawPile: PublicCleavageDrawPileRepository;
    currentCleavage:CurrentCleavageRepository
    player:PlayerRepository
}
export interface FakeClientApplicationRepositories extends ClientApplicationRepositories {
    gamePhase: InMemoryGamePhaseRepository
    bar: InMemoryBarRepository
    autoplay: InMemoryAutoplayRepository
    publicCleavageDrawPile: InMemoryPublicCleavageDrawPileRepository;
    currentCleavage:InMemoryCurrentCleavageRepository;
    player: InMemoryPlayerRepository;

}
export interface ProductionClientApplicationRepositories extends ClientApplicationRepositories {
    gamePhase: InMemoryGamePhaseRepository
    bar: InMemoryBarRepository
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
    globalCleavageDrawPileRepository: GlobalCleavageDrawPileRepository
}
