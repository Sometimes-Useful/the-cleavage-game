
import type { Player } from '../../../domain/entities/Player'
import type { PlayerRepository } from '../../../domain/ports/secondary/repositories/PlayerRepository'

export class InMemoryPlayerRepository implements PlayerRepository {
    hasPlayer (player:Player): Promise<boolean> {
        const includePlayer = this.currentPlayers.some(includedplayer => includedplayer.username === player.username)
        return Promise.resolve(includePlayer)
    }

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
