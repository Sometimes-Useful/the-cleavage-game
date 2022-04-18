export interface ChoiceDTO {
    name:string,
    players:string[]
}

export class Choice {
    constructor (choiceDto:ChoiceDTO) {
        this.name = choiceDto.name
        this.players = choiceDto.players
    }

    toDTO ():ChoiceDTO {
        return {
            name: this.name,
            players: this.players
        }
    }

    name: string;
    players: string[];
}
