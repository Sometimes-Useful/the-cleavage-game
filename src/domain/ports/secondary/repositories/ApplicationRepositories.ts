import type { InMemoryAutoplayRepository } from '../../../../infra/repositories/autoplay/InMemoryAutoplayRepository'
import type { InMemoryBarRepository } from '../../../../infra/repositories/bar/InMemoryBarRepository'
import type { InMemoryCurrentCleavageRepository } from '../../../../infra/repositories/currentCleavage/InMemoryCurrentCleavageRepository'
import type { InMemoryGamePhaseRepository } from '../../../../infra/repositories/gamePhase/InMemoryGamePhaseRepository'
import type { InMemoryGlobalCleavageDrawPileRepository } from '../../../../infra/repositories/globalCleavageDrawPile/InMemoryGlobalCleavageRepository'
import type { InMemoryPlayerRepository } from '../../../../infra/repositories/player/InMemoryPlayerRepository'
import type { InMemoryPublicCleavageDrawPileRepository } from '../../../../infra/repositories/publicCleavageDrawPile/InMemoryPublicCleavageDrawPileRepository'
import type { InMemoryVideoExtractRepository } from '../../../../infra/repositories/videoExtract/InMemoryVideoExtractRepository'
import type { AutoplayRepository } from './AutoplayRepository'
import type { BarRepository } from './BarRepository'
import type { CurrentCleavageRepository } from './CurrentCleavageRepository'
import type { GamePhaseRepository } from './GamePhaseRepository'
import type { GlobalCleavageDrawPileRepository } from './GlobalCleavageDrawPileRepository'
import type { PlayerRepository } from './PlayerRepository'
import type { PublicCleavageDrawPileRepository } from './PublicCleavageDrawPileRepository'
import type { VideoExtractRepository } from './VideoExtractRepository'
import type { RegisteredStreamersRepository } from './RegisteredStreamersRepository'
import type { InMemoryGlobalRegisteredStreamersRepository } from '../../../../infra/repositories/registeredStreamers/InMemoryRegisteredStreamersRepository'

export interface ClientApplicationRepositories {
    videoExtracts: VideoExtractRepository
    gamePhase:GamePhaseRepository
    bar:BarRepository
    autoplay:AutoplayRepository
    publicCleavageDrawPile: PublicCleavageDrawPileRepository;
    currentCleavage:CurrentCleavageRepository
    player:PlayerRepository
}
export interface FakeClientApplicationRepositories extends ClientApplicationRepositories {
    videoExtracts: InMemoryVideoExtractRepository
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
    globalRegisteredStreamers:RegisteredStreamersRepository
    globalCleavageDrawPileRepository:GlobalCleavageDrawPileRepository
}
export interface FakeServerApplicationRepositories extends ServerApplicationRepositories {
    globalRegisteredStreamers: InMemoryGlobalRegisteredStreamersRepository
    globalCleavageDrawPileRepository: InMemoryGlobalCleavageDrawPileRepository

}
export interface ProductionServerApplicationRepositories extends ServerApplicationRepositories {
    globalRegisteredStreamers:RegisteredStreamersRepository
    globalCleavageDrawPileRepository: GlobalCleavageDrawPileRepository
}
