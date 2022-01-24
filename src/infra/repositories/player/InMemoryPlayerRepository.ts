import type { PlayerRepository } from '../../../domain/ports/PlayerRepository'
import type { Player } from '../../../domain/entities/Player'

export class InMemoryPlayerRepository implements PlayerRepository {
    players (): Promise<Player[]> {
        return Promise.resolve(this.currentPlayers)
    }

    remove (player: Player): Promise<void> {
        this.currentPlayers = this.currentPlayers.filter(currentPlayer => currentPlayer.username !== player.username)
        return Promise.resolve()
    }

    add (player: Player): Promise<void> {
        this.currentPlayers.push(player)
        return Promise.resolve()
    }

    currentPlayers: Player[] = []
}
