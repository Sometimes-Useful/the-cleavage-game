
import type { Player } from '../../../domain/entities/Player'
import type { PlayerRepository } from '../../../domain/ports/secondary/repositories/PlayerRepository'

export class InMemoryPlayerRepository implements PlayerRepository {
    playerByUsername (username: string): Promise<Player> {
        const player = this.currentPlayers.get(username)
        return player
            ? Promise.resolve(player)
            : Promise.reject(new Error(`Player with username '${username}' not found.`))
    }

    hasPlayer (username:string): Promise<boolean> {
        return Promise.resolve(this.currentPlayers.has(username))
    }

    loadAllPlayers (): Promise<Player[]> {
        return Promise.resolve([...this.currentPlayers.values()])
    }

    remove (player: Player): Promise<void> {
        this.currentPlayers.delete(player.username)
        return Promise.resolve()
    }

    save (player: Player): Promise<void> {
        this.currentPlayers.set(player.username, player)
        return Promise.resolve()
    }

    currentPlayers: Map<string, Player> =new Map()
}
