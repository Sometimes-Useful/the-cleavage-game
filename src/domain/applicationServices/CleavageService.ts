import type { Cleavage } from '../entities/Cleavage'
import { MessageForPlayer } from '../entities/MessageForPlayer'
import type { Player } from '../entities/Player'
import { PlayerCleave } from '../entities/PlayerCleave'
import type{ PlayerCleaveEvent } from '../events/playerCleave/PlayerCleaveEvent'
import type{ ChatGateway } from '../ports/ChatGateway'
import type{ CleavageRepository } from '../ports/CleavageRepository'

export class CleavageApplicationService {
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
        return this.cleavageRepository.isPublicCleavageExistByTitle(cleavage)
    }

    addPublicCleavage (cleavage: Cleavage):Promise<void> {
        return this.cleavageRepository.addPublicCleavage(cleavage)
    }

    constructor (private cleavageRepository: CleavageRepository, private chatGateway:ChatGateway) { }

    loadCleavage ():Promise<Cleavage> {
        return this.cleavageRepository.load()
    }

    hasCleavage (): Promise<boolean> {
        return this.cleavageRepository.hasCleavage()
    }

    playerCleave (event: PlayerCleaveEvent): Promise<void> {
        return this.cleavageRepository.load()
            .then(cleavage => this.onCleave(cleavage, event))
            .catch(error => Promise.reject(error))
    }

    public saveCleavage (cleavage: Cleavage):Promise<void> {
        return this.cleavageRepository.save(cleavage)
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
        return this.cleavageRepository.nextPublicCleavage()
    }
}
