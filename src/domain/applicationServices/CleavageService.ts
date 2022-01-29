import type { Cleavage } from '../entities/Cleavage'
import { MessageForPlayer } from '../entities/MessageForPlayer'
import type { Player } from '../entities/Player'
import { PlayerCleave } from '../entities/PlayerCleave'
import type{ PlayerCleaveEvent } from '../events/playerCleave/PlayerCleaveEvent'
import type { PublicCleavageDrawPileRepository } from '../ports/secondary/repositories/PublicCleavageDrawPileRepository'
import type { GlobalCleavageDrawPileRepository } from '../ports/secondary/repositories/GlobalCleavageDrawPileRepository'
import type { CurrentCleavageRepository } from '../ports/secondary/repositories/CurrentCleavageRepository'
import type { ChatGateway } from '../ports/secondary/gateways/ChatGateway'
import type { RandomGateway } from '../ports/secondary/gateways/RandomGateway'

export class CleavageApplicationService {
    constructor (
        private publicCleavageDrawPileRepository: PublicCleavageDrawPileRepository,
        private globalCleavageDrawPileRepository:GlobalCleavageDrawPileRepository,
        private currentCleavageRepository:CurrentCleavageRepository,
        private chatGateway:ChatGateway,
        private randomGateway: RandomGateway
    ) { }

    saveGlobalCleavage (cleavage: Cleavage): Promise<void> {
        return this.globalCleavageDrawPileRepository.hasCleavage(cleavage)
            .then(hasCleavage => hasCleavage ? Promise.resolve() : this.globalCleavageDrawPileRepository.save(cleavage))
            .catch(error => Promise.reject(error))
    }

    removePlayerOnCleavage (player:Player):Promise<void> {
        return this.loadCleavage()
            .then(cleavage => {
                cleavage.cleaves.delete(player.username)
                return this.saveCleavage(cleavage)
            })
            .catch(error => Promise.reject(error))
    }

    public addPlayerOnCleavage (player:Player): Promise<void> {
        return this.loadCleavage()
            .then(cleavage => {
                cleavage.cleaves.set(player.username, PlayerCleave.NOTHING)
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

    loadCleavage ():Promise<Cleavage> {
        return this.currentCleavageRepository.load()
    }

    hasCleavage (): Promise<boolean> {
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
        const playerPreviousCleave = cleavage.cleaves.get(event.player.username)
        return playerPreviousCleave
            ? this.onPlayerAlreadyCleave(event, playerPreviousCleave, cleavage)
            : this.cleave(event, cleavage)
    }

    private cleave (event: PlayerCleaveEvent, cleavage: Cleavage) {
        cleavage.cleaves.set(event.player.username, event.playerCleave)
        return this.saveCleavage(cleavage)
    }

    private onPlayerAlreadyCleave (event: PlayerCleaveEvent, previousPlayerCleave: PlayerCleave, cleavage:Cleavage): Promise<void> {
        if (event.playerCleave === previousPlayerCleave) return this.chatGateway.sendMessageToPlayer(new MessageForPlayer(event.player, `You have still cleave ${previousPlayerCleave}`))
        return this.uncleave(previousPlayerCleave, cleavage)
            .then(cleavage => this.cleave(event, cleavage))
            .catch(error => Promise.reject(error))
    }

    private uncleave (previousPlayerCleave: PlayerCleave, cleavage: Cleavage): Promise<Cleavage> {
        return Promise.resolve(cleavage)
    }

    nextPublicCleavage (): Promise<Cleavage|undefined> {
        return this.publicCleavageDrawPileRepository.nextCleavage()
    }

    randomGlobalCleavage ():Promise<Cleavage|undefined> {
        return this.globalCleavageDrawPileRepository.globalCleavageQuantity()
            .then(globalCleavageQuantity => globalCleavageQuantity === 0 ? Promise.resolve(undefined) : this.onGlobalCleavage(globalCleavageQuantity))
            .catch(error => Promise.reject(error))
    }

    onGlobalCleavage (globalCleavageQuantity:number): Promise<Cleavage> {
        return this.randomGateway.randomIntergerOnRange(1, globalCleavageQuantity)
            .then(randomGlobalCleavageNumber => this.globalCleavageDrawPileRepository.retrieveGlobalCleavageByIndex(randomGlobalCleavageNumber - 1))
            .catch(error => Promise.reject(error))
    }
}
