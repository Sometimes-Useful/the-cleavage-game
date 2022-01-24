import type { Player } from './Player'

export class MessageForPlayer {
    constructor (
        public player: Player,
        public message: string
    ) { }
}

export const noCleavagePleaseWait = (player:Player):MessageForPlayer => ({
    player: player,
    message: `Il n'y a pas de clivage en cours ${player}. Attends un peu.`
})

export const welcomePlayerMessage = (player:Player):MessageForPlayer => ({
    player,
    message: welcomeMessage(player)
})
const welcomeMessage = (player: Player): string => `Bienvenue ${player.username} au jeu du clivage!
Si tu as besoin d'aide, tu peux tapper '!h'.`
