export class MessageForPlayer {
    constructor (
        public username: string,
        public message: string
    ) { }
}

export const noCleavagePleaseWait = (username:string):MessageForPlayer => ({
    username: username,
    message: `Il n'y a pas de clivage en cours ${username}. Attends un peu.`
})

export const welcomePlayerMessage = (username:string):MessageForPlayer => ({
    username: username,
    message: welcomeMessage(username)
})
const welcomeMessage = (username: string): string => `Bienvenue ${username} au jeu du clivage! Tu peux tapper '!h' pour l'aide.`
