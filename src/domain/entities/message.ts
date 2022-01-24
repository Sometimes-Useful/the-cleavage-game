export class Message {
    constructor (public message: string) { }
}

export class WelcomeMessage extends Message {
    constructor () {
        super(welcomeMessage)
    }
}
const welcomeMessage = `La régie du jeu du clivage est chaud patate!
Pour obtenir de l'aide, lancer la commande '!h'`
