import type { Cleavage } from '../entities/Cleavage'
import { MessageForPlayer } from '../entities/MessageForPlayer'
import { PlayerCleave } from '../entities/PlayerCleave'
import type{ PlayerCleaveEvent } from '../events/playerCleave/PlayerCleaveEvent'
import type{ ChatGateway } from '../ports/ChatGateway'
import type{ CleavageRepository } from '../ports/CleavageRepository'

export class CleavageApplicationService {
    constructor (private cleavageRepository: CleavageRepository, private chatGateway:ChatGateway) { }
    playerCleave (event: PlayerCleaveEvent): Promise<void> {
        return this.cleavageRepository.load()
            .then(cleavage => this.onCleave(cleavage, event))
            .catch(error => Promise.reject(error))
    }

    public saveCleavage (cleavage: Cleavage):Promise<void> {
        return this.cleavageRepository.save(cleavage)
    }

    private onCleave (cleavage: Cleavage, event: PlayerCleaveEvent): Promise<void> {
        const playerPreviousCleave = cleavage.cleaves.get(event.player)
        return playerPreviousCleave
            ? this.onPlayerAlreadyCleave(event, playerPreviousCleave, cleavage)
            : this.cleave(event, cleavage)
    }

    private cleave (event: PlayerCleaveEvent, cleavage: Cleavage) {
        if (event.playerCleave === PlayerCleave.LEFT)
            cleavage.cleaveLeft++
        if (event.playerCleave === PlayerCleave.RIGHT)
            cleavage.cleaveRight++
        cleavage.cleaves.set(event.player, event.playerCleave)
        return this.saveCleavage(cleavage)
    }

    private onPlayerAlreadyCleave (event: PlayerCleaveEvent, previousPlayerCleave: PlayerCleave, cleavage:Cleavage): Promise<void> {
        if (event.playerCleave === previousPlayerCleave) return this.chatGateway.sendMessageToPlayer(new MessageForPlayer(event.player, `You have still cleave ${previousPlayerCleave}`))
        return this.uncleave(previousPlayerCleave, cleavage)
            .then(cleavage => this.cleave(event, cleavage))
            .catch(error => Promise.reject(error))
    }

    private uncleave (previousPlayerCleave: PlayerCleave, cleavage: Cleavage): Promise<Cleavage> {
        if (previousPlayerCleave === PlayerCleave.LEFT)
            cleavage.cleaveLeft--
        if (previousPlayerCleave === PlayerCleave.RIGHT)
            cleavage.cleaveRight--
        return Promise.resolve(cleavage)
    }
}
