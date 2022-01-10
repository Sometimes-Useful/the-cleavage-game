export class MessageForPlayer {
    constructor (public player: string, public message: string) { }
}

export const noCleavagePleaseWait = (player:string):MessageForPlayer => ({
    player: player,
    message: `Il n'y a pas de clivage en cours ${player}. Attends un peu.`
})
