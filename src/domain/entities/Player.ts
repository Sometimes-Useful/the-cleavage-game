
export interface PlayerDTO {
    username:string
}

export class Player {
    constructor (playerDTO:PlayerDTO) {
        this.username = playerDTO.username
    }

    toDto ():PlayerDTO {
        return {
            username: this.username
        }
    }

    public username:string
}
