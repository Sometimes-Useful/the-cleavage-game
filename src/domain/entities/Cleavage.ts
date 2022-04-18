import { Choice } from './Choice'

export interface CleavageDTO {
    title: string,
    leftChoice: {
        name: string,
        players: string[]
    },
    rightChoice: {
        name: string,
        players: string[]
    },
    players: string[]
}

export class Cleavage {
    constructor (cleavageDto:CleavageDTO) {
        this.title = cleavageDto.title
        this.leftChoice = new Choice(cleavageDto.leftChoice)
        this.rightChoice = new Choice(cleavageDto.rightChoice)
        this.players = cleavageDto.players
    }

    toDto ():CleavageDTO {
        return {
            title: this.title,
            leftChoice: this.leftChoice.toDTO(),
            rightChoice: this.rightChoice.toDTO(),
            players: this.players
        }
    }

    title: string
    leftChoice: Choice
    rightChoice: Choice
    players: string[]
}
