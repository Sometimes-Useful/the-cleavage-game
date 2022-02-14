import { Player, PlayerDTO } from './Player'

export interface ChoiceDTO {
    name:string,
    players:PlayerDTO[]
}

export class Choice {
    constructor (choiceDto:ChoiceDTO) {
        this.name = choiceDto.name
        this.players = choiceDto.players.map(player => new Player(player))
    }

    toDTO ():ChoiceDTO {
        return {
            name: this.name,
            players: this.players.map(player => player.toDto())
        }
    }

    name: string;
    players: Player[];
}
