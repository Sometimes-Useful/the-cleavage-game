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
`<span class="text-xl text-primary-variant">AIDE</span><br>
En tant que joueur tu as différentes<br>
commandes dans le chat:
<ul class="list-disc">
<li><span class="font-bold text-primary-variant">${applicationMessagePrefix + AuthorizedMessage.SUGGEST_CLEAVAGE} Nom du clivage</span> Proposer un clivage.</li>
<li><span class="font-bold text-primary-variant">${applicationMessagePrefix + AuthorizedMessage.LEFT}</span> Cliver à Gôche.</li>
<li><span class="font-bold text-primary-variant">${applicationMessagePrefix + AuthorizedMessage.RIGHT}</span> Cliver à Drouate.</li>
<li><span class="font-bold text-primary-variant">${applicationMessagePrefix + AuthorizedMessage.SHORT_APPLAUSE}</span> Applaudir.</li>
<li><span class="font-bold text-primary-variant">${applicationMessagePrefix + AuthorizedMessage.SHORT_HYPERLIKE}</span> Kiffer.</li>
<li><span class="font-bold text-primary-variant">${applicationMessagePrefix + AuthorizedMessage.SHORT_SHOOT}</span> Huer.</li>
<li><span class="font-bold text-primary-variant">${applicationMessagePrefix + AuthorizedMessage.SHORT_WHISTLE}</span> Siffler.</li>
</ul>
Attention... ça va cliver.`
