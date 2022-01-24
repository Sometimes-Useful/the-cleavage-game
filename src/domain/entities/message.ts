export class Message {
    constructor (public message: string) { }
}

export class WelcomeMessage extends Message {
    constructor () {
        super("Le jeu du clivage a démarré. Pour obtenir de l'aide, lancer la commande '!h'")
    }
}
