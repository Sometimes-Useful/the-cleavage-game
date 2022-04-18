
import { Player } from '../entities/Player'
import type { Position } from '../entities/Position'
import type { Size } from '../entities/Size'
import { SpriteType } from '../entities/SpriteType'
import { DrawEvent } from '../events/draw/DrawEvent'
import { PlayerJoinBarEvent } from '../events/playerJoinBar/PlayerJoinBarEvent'
import type { EventGatewaySecondary } from '../ports/secondary/gateways/EventGatewaySecondary'
import type { PlayerRepository } from '../ports/secondary/repositories/PlayerRepository'
import { defaultPlayerSize } from '../tests/testContexts'

export class PlayerApplicationService {
    playerByUsername (username: string):Promise<Player> {
        return this.playerRepository.playerByUsername(username)
    }

    constructor (
        private playerRepository:PlayerRepository,
        private eventGateway:EventGatewaySecondary
    ) {}

    updatePosition (username: string, position: Position, size:Size): Promise<void> {
        return this.playerRepository.playerByUsername(username)
            .then(player => {
                player.position = position
                return this.playerRepository.save(player)
            })
            .then(() => this.eventGateway.sendEvent(new DrawEvent(username, { position, size, spriteType: SpriteType.PLAYER })))
            .catch(error => Promise.reject(error))
    }

    players ():Promise<Player[]> {
        return this.playerRepository.loadAllPlayers()
    }

    removePlayer (player: Player): Promise<void> {
        return this.playerRepository.remove(player)
    }

    addPlayer (username: string): Promise<void> {
        return this.playerRepository.hasPlayer(username)
            .then(hasPlayer => hasPlayer ? Promise.resolve() : this.onNewPlayer(username))
            .catch(error => Promise.reject(error))
    }

    private onNewPlayer (username: string): void | PromiseLike<void> {
        const player:Player = new Player({
            username,
            size: defaultPlayerSize
        })
        return this.playerRepository.save(player)
            .then(() => this.eventGateway.sendEvent(new PlayerJoinBarEvent(player.username)))
            .catch(error => Promise.reject(error))
    }
}
