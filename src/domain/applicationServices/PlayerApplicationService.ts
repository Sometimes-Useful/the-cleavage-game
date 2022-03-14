
import type { Player } from '../entities/Player'
import type { Position } from '../entities/Position'
import { DrawEvent } from '../events/draw/DrawEvent'
import { PlayerJoinBarEvent } from '../events/playerJoinBar/PlayerJoinBarEvent'
import { Sprite } from '../events/playerMove/Sprite'
import type { EventGatewaySecondary } from '../ports/secondary/gateways/EventGatewaySecondary'
import type { PlayerRepository } from '../ports/secondary/repositories/PlayerRepository'

export class PlayerApplicationService {
    constructor (
        private playerRepository:PlayerRepository,
        private eventGateway:EventGatewaySecondary
    ) {}

    updatePosition (username: string, position: Position): Promise<void> {
        return this.playerRepository.playerByUsername(username)
            .then(player => {
                player.position = position
                return this.playerRepository.save(player)
            })
            .then(() => this.eventGateway.sendEvent(new DrawEvent(username, { position, sprite: Sprite.PLAYER })))
            .catch(error => Promise.reject(error))
    }

    players ():Promise<Player[]> {
        return this.playerRepository.loadAllPlayers()
    }

    removePlayer (player: Player): Promise<void> {
        return this.playerRepository.remove(player)
    }

    addPlayer (player: Player): Promise<void> {
        return this.playerRepository.hasPlayer(player)
            .then(hasPlayer => hasPlayer ? Promise.resolve() : this.onNewPlayer(player))
            .catch(error => Promise.reject(error))
    }

    private onNewPlayer (player: Player): void | PromiseLike<void> {
        return this.playerRepository.save(player)
            .then(() => this.eventGateway.sendEvent(new PlayerJoinBarEvent(player.username)))
            .catch(error => Promise.reject(error))
    }
}
