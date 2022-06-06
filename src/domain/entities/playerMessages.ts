import { applicationMessagePrefix } from './applicationMessagePrefix'
import { AuthorizedMessage } from './AuthorizedMessage'
import type { Cleavage } from './Cleavage'
export const missingTitleMessage = 'Il manque le titre ma gueule!'
export const dontKnowWhatToDoWithThatMessage = (username: string): string => `C'est pas clair ${username}. Penses à faire -h pour obtenir de l'aide.`
export const waitForCleavageLaunchMessage = 'Attends que le clivage soit lancé! 👀'
export const cleavageSuggested = (username:string, cleavageTitle:string): string => `Le clivage '${cleavageTitle}' sera proposé au streamer.\n Merci ${username} 👍`
export const cleavageAlreadySuggested = 'Le clivage a déjà été proposé.'
export const multipleCleaveOptionsAvailable = (cleavage: Cleavage): string => `C'est pas clair... Voila les choix possibles '${cleavage.leftChoice.name}', '${cleavage.rightChoice.name}'.`
export const helpMessage:string =
`Le jeu du clivage!
Un jeu pour tout la famille.
En tant que joueur tu peux:
- [ ${applicationMessagePrefix + AuthorizedMessage.HELP} ] Afficher l'aide (tu viens de le faire XD).
- [ ${applicationMessagePrefix + AuthorizedMessage.SHORT_HELP} ] Afficher l'aide (tu viens de le faire XD).
- [ ${applicationMessagePrefix + AuthorizedMessage.SUGGEST_CLEAVAGE} {Nom du clivage} ] Proposer un clivage.
- [ ${applicationMessagePrefix + AuthorizedMessage.LEFT} ] Cliver à Gôche.
- [ ${applicationMessagePrefix + AuthorizedMessage.RIGHT} ] Cliver à Drouate.
- [ ${applicationMessagePrefix + AuthorizedMessage.SHORT_APPLAUSE} ] Applaudir.
- [ ${applicationMessagePrefix + AuthorizedMessage.SHORT_HYPERLIKE} ] Kiffer.
- [ ${applicationMessagePrefix + AuthorizedMessage.SHORT_SHOOT} ] Huer.
- [ ${applicationMessagePrefix + AuthorizedMessage.SHORT_WHISTLE} ] Siffler.
Attention... ça va cliver!`
