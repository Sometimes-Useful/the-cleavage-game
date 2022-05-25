import { Cleavage } from '../entities/Cleavage'
import { MessageForPlayer } from '../entities/MessageForPlayer'
import type { Player } from '../entities/Player'
import { PlayerCleave } from '../entities/PlayerCleave'
import type{ PlayerCleaveEvent } from '../events/playerCleave/PlayerCleaveEvent'
import type { PublicCleavageDrawPileRepository } from '../ports/secondary/repositories/PublicCleavageDrawPileRepository'
import type { CurrentCleavageRepository } from '../ports/secondary/repositories/CurrentCleavageRepository'
import type { ChatGateway } from '../ports/secondary/gateways/ChatGateway'
import type { GlobalCleavageDrawPileGateway } from '../ports/secondary/gateways/GlobalCleavageDrawPileGateway'
import type { GamePhaseRepository } from '../ports/secondary/repositories/GamePhaseRepository'
import type { GamePhase } from '../entities/GamePhase'

export class CleavageApplicationService {
    constructor (
        private publicCleavageDrawPileRepository: PublicCleavageDrawPileRepository,
        private globalCleavageDrawPileGateway:GlobalCleavageDrawPileGateway,
        private currentCleavageRepository:CurrentCleavageRepository,
        private chatGateway:ChatGateway,
        private gamePhaseRepository: GamePhaseRepository
    ) { }

    retrieveCleavageDrawpileQuantity ():Promise<number> {
        return this.globalCleavageDrawPileGateway.retrieveCleavageDrawpileQuantity()
    }

    changeGamePhase (gamePhase: GamePhase): Promise<void> {
        return this.gamePhaseRepository.changeGamePhase(gamePhase)
    }

    retrieveCurrentGamePhase (): Promise<GamePhase> {
        return this.gamePhaseRepository.retrieveCurrentGamePhase()
    }

    saveGlobalCleavage (cleavage: Cleavage): Promise<void> {
        const currentClevageDto = cleavage.toDto()
        currentClevageDto.players = []
        return this.globalCleavageDrawPileGateway.save(new Cleavage(currentClevageDto))
    }

    removePlayerOnCleavage (player:Player):Promise<void> {
        return this.loadCurrentCleavage()
            .then(cleavage => {
                cleavage.leftChoice.players = cleavage.leftChoice.players.filter(cleavePlayer => cleavePlayer !== player.username)
                cleavage.rightChoice.players = cleavage.rightChoice.players.filter(cleavePlayer => cleavePlayer !== player.username)
                cleavage.players = cleavage.players.filter(cleavePlayer => cleavePlayer !== player.username)
                return this.saveCleavage(cleavage)
            })
            .catch(error => Promise.reject(error))
    }

    public addPlayerOnCleavage (player:Player): Promise<void> {
        return this.loadCurrentCleavage()
            .then(cleavage => {
                cleavage.players.push(player.username)
                return this.saveCleavage(cleavage)
            })
            .catch(error => Promise.reject(error))
    }

    isPublicCleavageExist (cleavage: Cleavage):Promise<boolean> {
        return this.publicCleavageDrawPileRepository.isCleavageExistByTitle(cleavage)
    }

    addPublicCleavage (cleavage: Cleavage):Promise<void> {
        return this.publicCleavageDrawPileRepository.addCleavage(cleavage)
    }

    loadCurrentCleavage ():Promise<Cleavage> {
        return this.currentCleavageRepository.load()
    }

    hasCurrentCleavage (): Promise<boolean> {
        return this.currentCleavageRepository.hasCleavage()
    }

    playerCleave (event: PlayerCleaveEvent): Promise<void> {
        return this.currentCleavageRepository.load()
            .then(cleavage => this.onCleave(cleavage, event))
            .catch(error => Promise.reject(error))
    }

    public saveCleavage (cleavage: Cleavage):Promise<void> {
        return this.currentCleavageRepository.save(cleavage)
    }

    private onCleave (cleavage: Cleavage, event: PlayerCleaveEvent): Promise<void> {
        if (!cleavage.players.some(player => player === event.username))cleavage.players.push(event.username)
        const playerPreviousCleave = this.previousPlayerCleave(cleavage, event)
        return playerPreviousCleave !== PlayerCleave.NOTHING
            ? this.onPlayerAlreadyCleave(event, playerPreviousCleave, cleavage)
            : this.cleave(event, cleavage)
    }

    private previousPlayerCleave (cleavage: Cleavage, event: PlayerCleaveEvent):PlayerCleave {
        return cleavage.leftChoice.players.some(player => player === event.username)
            ? PlayerCleave.LEFT
            : cleavage.rightChoice.players.some(player => player === event.username)
                ? PlayerCleave.RIGHT
                : PlayerCleave.NOTHING
    }

    private cleave (event: PlayerCleaveEvent, cleavage: Cleavage) {
        if (event.playerCleave === PlayerCleave.LEFT) cleavage.leftChoice.players.push(event.username)
        if (event.playerCleave === PlayerCleave.RIGHT) cleavage.rightChoice.players.push(event.username)
        return this.saveCleavage(cleavage)
    }

    private onPlayerAlreadyCleave (event: PlayerCleaveEvent, previousPlayerCleave: PlayerCleave, cleavage:Cleavage): Promise<void> {
        return event.playerCleave === previousPlayerCleave
            ? this.chatGateway.sendMessageToPlayer(new MessageForPlayer(event.username, `You have still cleave ${previousPlayerCleave}`))
            : this.uncleave(event, previousPlayerCleave, cleavage)
                .then(cleavage => this.cleave(event, cleavage))
                .catch(error => Promise.reject(error))
    }

    private uncleave (event: PlayerCleaveEvent, previousPlayerCleave: PlayerCleave, cleavage: Cleavage): Promise<Cleavage> {
        if (previousPlayerCleave === PlayerCleave.LEFT) cleavage.leftChoice.players = cleavage.leftChoice.players.filter(player => player !== event.username)
        if (previousPlayerCleave === PlayerCleave.RIGHT) cleavage.rightChoice.players = cleavage.rightChoice.players.filter(player => player !== event.username)
        return Promise.resolve(cleavage)
    }

    nextPublicCleavage (): Promise<Cleavage|undefined> {
        return this.publicCleavageDrawPileRepository.nextCleavage()
    }

    randomGlobalCleavage ():Promise<Cleavage|undefined> {
        return this.globalCleavageDrawPileGateway.drawGlobalCleavage()
    }
}
