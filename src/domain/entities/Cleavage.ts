import { Choice } from './Choice'
import { Player, PlayerDTO } from './Player'

export interface CleavageDTO {
    title: string,
    leftChoice: {
        name: string,
        players: PlayerDTO[]
    },
    rightChoice: {
        name: string,
        players: PlayerDTO[]
    },
    players: PlayerDTO[]
}

export class Cleavage {
    constructor (cleavageDto:CleavageDTO) {
        this.title = cleavageDto.title
        this.leftChoice = new Choice(cleavageDto.leftChoice)
        this.rightChoice = new Choice(cleavageDto.rightChoice)
        this.players = cleavageDto.players.map(player => new Player(player))
    }

    toDto ():CleavageDTO {
        return {
            title: this.title,
            leftChoice: this.leftChoice.toDTO(),
            rightChoice: this.rightChoice.toDTO(),
            players: this.players.map(player => player.toDto())
        }
    }

    title: string
    leftChoice: Choice
    rightChoice: Choice
    players: Player[]
}
