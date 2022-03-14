import type { GamePhase } from '../../../entities/GamePhase'

export interface GamePhaseRepository {
    changeGamePhase(gamePhase: GamePhase): Promise<void>;
    retrieveCurrentGamePhase(): Promise<GamePhase>;
}
