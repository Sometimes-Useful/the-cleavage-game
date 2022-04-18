import type { Position } from './Position'
import type { Size } from './Size'

export interface PlayerDTO {
    size: Size
    username:string
    position?:Position
}

export class Player {
    constructor (playerDTO:PlayerDTO) {
        this.username = playerDTO.username
        this.position = playerDTO.position
        this.size = playerDTO.size
    }

    toDto ():PlayerDTO {
        return {
            username: this.username,
            position: this.position,
            size: this.size
        }
    }

    public username:string
    public position?:Position
    public size: Size
}
