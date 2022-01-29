
import type { Player } from '../entities/Player'
import type { PlayerRepository } from '../ports/secondary/repositories/PlayerRepository'

export class PlayerApplicationService {
    constructor (
        private playerRepository:PlayerRepository
    ) {}

    players ():Promise<Player[]> {
        return this.playerRepository.players()
    }

    removePlayer (player: Player): Promise<void> {
        return this.playerRepository.remove(player)
    }

    addPlayer (player: Player): Promise<void> {
        return this.playerRepository.hasPlayer(player)
            .then(hasPlayer => hasPlayer ? Promise.resolve() : this.playerRepository.add(player))
    }
}
