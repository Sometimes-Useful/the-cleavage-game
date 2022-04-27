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
    majorScore (): number {
        const majorChoice = this.majorChoice()
        return majorChoice
            ? majorChoice === this.leftChoice.name
                ? this.leftChoice.players.length / this.players.length * 100
                : this.rightChoice.players.length / this.players.length * 100
            : 50
    }

    majorChoice (): string|undefined {
        return this.leftChoice.players.length > this.rightChoice.players.length
            ? this.leftChoice.name
            : this.leftChoice.players.length < this.rightChoice.players.length
                ? this.rightChoice.name
                : undefined
    }

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
