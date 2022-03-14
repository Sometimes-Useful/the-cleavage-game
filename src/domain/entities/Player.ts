import type { Position } from './Position'

export interface PlayerDTO {
    username:string
    position?:Position
}

export class Player {
    constructor (playerDTO:PlayerDTO) {
        this.username = playerDTO.username
        this.position = playerDTO.position
    }

    toDto ():PlayerDTO {
        return {
            username: this.username,
            position: this.position
        }
    }

    public username:string
    public position?:Position
}
