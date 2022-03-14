import { GamePhase } from '../../../domain/entities/GamePhase'
import type { GamePhaseRepository } from '../../../domain/ports/secondary/repositories/GamePhaseRepository'

export class InMemoryGamePhaseRepository implements GamePhaseRepository {
    changeGamePhase (gamePhase: GamePhase): Promise<void> {
        this.currentGamePhase = gamePhase
        return Promise.resolve()
    }

    retrieveCurrentGamePhase (): Promise<GamePhase> {
        return Promise.resolve(this.currentGamePhase)
    }

    currentGamePhase: GamePhase = GamePhase.NONE;
}
