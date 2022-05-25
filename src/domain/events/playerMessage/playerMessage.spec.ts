import { applicationMessagePrefix } from '../../entities/applicationMessagePrefix'
import { AuthorizedMessage } from '../../entities/AuthorizedMessage'
import { Cleavage } from '../../entities/Cleavage'
import { MessageForPlayer } from '../../entities/MessageForPlayer'
import { PlayerCleave } from '../../entities/PlayerCleave'
import { dontKnowWhatToDoWithThatMessage } from '../../entities/playerMessages'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { cleavageTitle1, player1, player2 } from '../../tests/testContexts'
import { theChatGatewaDontSendMessageToPlayer, theChatGatewaySendMessageToPlayer } from '../../tests/unitTests/chatGateway'
import { theCurrentCleavageRepositoryHasCleavage } from '../../tests/unitTests/cleavageRepository'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { EventType } from '../EventType'
import { PlayerApplauseEvent } from '../playerApplause/PlayerApplauseEvent'
import { PlayerAskForHelpEvent } from '../playerAskForHelp/PlayerAskForHelpEvent'
import { PlayerCleaveEvent } from '../playerCleave/PlayerCleaveEvent'
import { PlayerHyperLikeEvent } from '../playerHyperLike/PlayerHyperLikeEvent'
import { PlayerShootEvent } from '../playerShoot/PlayerShootEvent'
import { PlayerWhistleEvent } from '../playerWhistle/PlayerWhistleEvent'
import { PlayerSuggestCleavageEvent } from '../suggestCleavage/PlayerSuggestCleavageEvent'
import { PlayerMessageEvent } from './PlayerMessageEvent'

const complicatedCleavageChoices = new Cleavage({ title: 'OSEF', leftChoice: { name: 'Doudou', players: [] }, rightChoice: { name: 'Doudi', players: [] }, players: [] })

feature(EventType.PLAYER_MESSAGE, [
    clientScenario(`Scenario 1 : ${applicationMessagePrefix + AuthorizedMessage.LEFT}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + AuthorizedMessage.LEFT)),
        theEventIsSent(Gherkin.THEN, new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT))
    ]),
    clientScenario(`Scenario 2 : ${applicationMessagePrefix + AuthorizedMessage.RIGHT}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + AuthorizedMessage.RIGHT)),
        theEventIsSent(Gherkin.THEN, new PlayerCleaveEvent(player1().username, PlayerCleave.RIGHT))
    ]),
    clientScenario(`Scenario 3 : ${applicationMessagePrefix + AuthorizedMessage.UNSUPPORTED}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + AuthorizedMessage.UNSUPPORTED)),
        theChatGatewaySendMessageToPlayer(Gherkin.THEN, new MessageForPlayer(player1().username, dontKnowWhatToDoWithThatMessage(player1().username)))
    ]),
    clientScenario(`Scenario 4 : ${AuthorizedMessage.UNSUPPORTED}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, AuthorizedMessage.UNSUPPORTED)),
        theChatGatewaySendMessageToPlayer(Gherkin.THEN, [])
    ]),
    clientScenario(`Scenario 5 : ${applicationMessagePrefix + AuthorizedMessage.RIGHT} with another player ${JSON.stringify(player2)}`, [
        whenEventOccurs(new PlayerMessageEvent(player2().username, applicationMessagePrefix + AuthorizedMessage.RIGHT)),
        theEventIsSent(Gherkin.THEN, new PlayerCleaveEvent(player2().username, PlayerCleave.RIGHT))
    ]),
    clientScenario(`Scenario 6 : ${`${applicationMessagePrefix}${AuthorizedMessage.SUGGEST_CLEAVAGE} ${cleavageTitle1}`}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, `${applicationMessagePrefix}${AuthorizedMessage.SUGGEST_CLEAVAGE} ${cleavageTitle1}`)),
        theEventIsSent(Gherkin.THEN, new PlayerSuggestCleavageEvent(player1().username, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [] }, rightChoice: { name: 'Drouate', players: [] }, players: [] })))
    ]),
    clientScenario(`Scenario 7 : ${`${applicationMessagePrefix}${AuthorizedMessage.HELP}`}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, `${applicationMessagePrefix}${AuthorizedMessage.HELP}`)),
        theEventIsSent(Gherkin.THEN, new PlayerAskForHelpEvent(player1().username))
    ]),
    clientScenario(`Scenario 8 : ${`${applicationMessagePrefix}${AuthorizedMessage.SHORT_HELP}`}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, `${applicationMessagePrefix}${AuthorizedMessage.SHORT_HELP}`)),
        theEventIsSent(Gherkin.THEN, new PlayerAskForHelpEvent(player1().username))
    ]),
    clientScenario(`Scenario 9 : ${`${applicationMessagePrefix}${AuthorizedMessage.SHORT_APPLAUSE}`}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, `${applicationMessagePrefix}${AuthorizedMessage.SHORT_APPLAUSE}`)),
        theEventIsSent(Gherkin.THEN, new PlayerApplauseEvent())
    ]),
    clientScenario(`Scenario 10 : ${`${applicationMessagePrefix}${AuthorizedMessage.SHORT_SHOOT}`}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, `${applicationMessagePrefix}${AuthorizedMessage.SHORT_SHOOT}`)),
        theEventIsSent(Gherkin.THEN, new PlayerShootEvent())
    ]),
    clientScenario(`Scenario 11 : ${`${applicationMessagePrefix}${AuthorizedMessage.SHORT_HYPERLIKE}`}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, `${applicationMessagePrefix}${AuthorizedMessage.SHORT_HYPERLIKE}`)),
        theEventIsSent(Gherkin.THEN, new PlayerHyperLikeEvent())
    ]),
    clientScenario(`Scenario 12 : ${`${applicationMessagePrefix}${AuthorizedMessage.SHORT_WHISTLE}`}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, `${applicationMessagePrefix}${AuthorizedMessage.SHORT_WHISTLE}`)),
        theEventIsSent(Gherkin.THEN, new PlayerWhistleEvent())
    ]),
    clientScenario(`Scenario 13 : "${applicationMessagePrefix}${AuthorizedMessage.SUGGEST_CLEAVAGE} "`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, `${applicationMessagePrefix}${AuthorizedMessage.SUGGEST_CLEAVAGE} `)),
        theChatGatewaySendMessageToPlayer(Gherkin.THEN, new MessageForPlayer(player1().username, 'Il manque le titre ma gueule!')),
        theEventIsSent(Gherkin.AND_THEN, [])
    ]),
    clientScenario(`Scenario 14 : "${applicationMessagePrefix}${AuthorizedMessage.SUGGEST_CLEAVAGE}"`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, `${applicationMessagePrefix}${AuthorizedMessage.SUGGEST_CLEAVAGE}`)),
        theChatGatewaySendMessageToPlayer(Gherkin.THEN, new MessageForPlayer(player1().username, 'Il manque le titre ma gueule!')),
        theEventIsSent(Gherkin.AND_THEN, [])
    ]),
    clientScenario(`Scenario 15 : ${applicationMessagePrefix + 'gauche'}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + 'gauche')),
        theEventIsSent(Gherkin.THEN, new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT))
    ]),
    clientScenario(`Scenario 16 : ${applicationMessagePrefix + 'ga'}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + 'ga')),
        theEventIsSent(Gherkin.THEN, new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT))
    ]),
    clientScenario(`Scenario 17 : ${applicationMessagePrefix + 'GauCh'}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + 'GauCh')),
        theEventIsSent(Gherkin.THEN, new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT))
    ]),
    clientScenario(`Scenario 18 : ${applicationMessagePrefix + '1'}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + '1')),
        theEventIsSent(Gherkin.THEN, new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT))
    ]),
    clientScenario(`Scenario 19 : ${applicationMessagePrefix + complicatedCleavageChoices.leftChoice.name}`, [
        theCurrentCleavageRepositoryHasCleavage(Gherkin.GIVEN, complicatedCleavageChoices),
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + complicatedCleavageChoices.leftChoice.name)),
        theEventIsSent(Gherkin.THEN, new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT))
    ]),
    clientScenario(`Scenario 20 : ${applicationMessagePrefix + 'droite'}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + 'droite')),
        theEventIsSent(Gherkin.THEN, new PlayerCleaveEvent(player1().username, PlayerCleave.RIGHT))
    ]),
    clientScenario(`Scenario 21 : ${applicationMessagePrefix + 'dr'}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + 'dr')),
        theEventIsSent(Gherkin.THEN, new PlayerCleaveEvent(player1().username, PlayerCleave.RIGHT))
    ]),
    clientScenario(`Scenario 22 : ${applicationMessagePrefix + 'DroIT'}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + 'DroIT')),
        theEventIsSent(Gherkin.THEN, new PlayerCleaveEvent(player1().username, PlayerCleave.RIGHT))
    ]),
    clientScenario(`Scenario 23 : ${applicationMessagePrefix + '2'}`, [
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + '2')),
        theEventIsSent(Gherkin.THEN, new PlayerCleaveEvent(player1().username, PlayerCleave.RIGHT))
    ]),
    clientScenario(`Scenario 24 : ${applicationMessagePrefix + complicatedCleavageChoices.rightChoice.name}`, [
        theCurrentCleavageRepositoryHasCleavage(Gherkin.GIVEN, complicatedCleavageChoices),
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + complicatedCleavageChoices.rightChoice.name)),
        theEventIsSent(Gherkin.THEN, new PlayerCleaveEvent(player1().username, PlayerCleave.RIGHT))
    ]),
    clientScenario(`Scenario 25 : ${applicationMessagePrefix + 'Dou'}`, [
        theCurrentCleavageRepositoryHasCleavage(Gherkin.GIVEN, complicatedCleavageChoices),
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + 'Dou')),
        theChatGatewaySendMessageToPlayer(Gherkin.THEN, new MessageForPlayer(player1().username, `C'est pas clair... Voila les choix possibles '${complicatedCleavageChoices.leftChoice.name}', '${complicatedCleavageChoices.rightChoice.name}'.`)),
        theEventIsSent(Gherkin.AND_THEN, [])
    ]),
    clientScenario(`Scenario 26 : ${applicationMessagePrefix + 'DOU'}`, [
        theCurrentCleavageRepositoryHasCleavage(Gherkin.GIVEN, complicatedCleavageChoices),
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + 'DOU')),
        theChatGatewaySendMessageToPlayer(Gherkin.THEN, new MessageForPlayer(player1().username, `C'est pas clair... Voila les choix possibles '${complicatedCleavageChoices.leftChoice.name}', '${complicatedCleavageChoices.rightChoice.name}'.`)),
        theEventIsSent(Gherkin.AND_THEN, [])
    ]),
    clientScenario(`Scenario 27 : ${applicationMessagePrefix + 'dou'}`, [
        theCurrentCleavageRepositoryHasCleavage(Gherkin.GIVEN, complicatedCleavageChoices),
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + 'dou')),
        theChatGatewaySendMessageToPlayer(Gherkin.THEN, new MessageForPlayer(player1().username, `C'est pas clair... Voila les choix possibles '${complicatedCleavageChoices.leftChoice.name}', '${complicatedCleavageChoices.rightChoice.name}'.`)),
        theEventIsSent(Gherkin.AND_THEN, [])
    ]),
    clientScenario(`Scenario 28 : ${applicationMessagePrefix + 'd'}`, [
        theCurrentCleavageRepositoryHasCleavage(Gherkin.GIVEN, complicatedCleavageChoices),
        whenEventOccurs(new PlayerMessageEvent(player1().username, applicationMessagePrefix + 'd')),
        theChatGatewaDontSendMessageToPlayer(Gherkin.THEN),
        theEventIsSent(Gherkin.THEN, new PlayerCleaveEvent(player1().username, PlayerCleave.RIGHT))
    ])
])
