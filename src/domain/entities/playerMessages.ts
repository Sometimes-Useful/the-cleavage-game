import { applicationMessagePrefix } from './applicationMessagePrefix'
import { AuthorizedMessage } from './AuthorizedMessage'
import type { Cleavage } from './Cleavage'
export const missingTitleMessage = 'Il manque le titre ma gueule!'
export const dontKnowWhatToDoWithThatMessage = (username: string): string => `I don't know what to do with that ${username}.`
export const waitForCleavageLaunchMessage = 'Wait for cleavage launch! 👀'
export const cleavageSuggested = (username:string, cleavageTitle:string): string => `Cleavage '${cleavageTitle}' suggested to streamer.\n You rocks ${username}! 👍`
export const cleavageAlreadySuggested = 'Cleavage already suggested.'
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
