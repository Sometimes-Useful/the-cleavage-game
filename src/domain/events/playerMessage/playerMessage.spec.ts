import { PlayerCleave } from '../../entities/PlayerCleave'
import { feature, scenario } from '../../tests/testSuites'
import { theChatGatewaySendMessageToPlayer, theEventIsSent, whenEventOccurs } from '../../tests/unitTests'
import { applicationMessagePrefix } from '../../entities/applicationMessagePrefix'
import { AuthorizedMessage } from '../../entities/AuthorizedMessage'
import { PlayerMessageEvent } from './PlayerMessageEvent'
import { Gherkin } from '../../tests/Gherkin'
import { PlayerCleaveEvent } from '../playerCleave/PlayerCleaveEvent'
import { MessageForPlayer } from '../../entities/MessageForPlayer'
import { cleavageTitle1, player1, player2 } from '../../tests/testContexts'
import { Cleavage } from '../../entities/Cleavage'
import { dontKnowWhatToDoWithThatMessage } from '../../entities/playerMessages'
import { PlayerApplauseEvent } from '../playerApplause/PlayerApplauseEvent'
import { PlayerShootEvent } from '../playerShoot/PlayerShootEvent'
import { PlayerHyperLikeEvent } from '../playerHyperLike/PlayerHyperLikeEvent'
import { PlayerWhistleEvent } from '../playerWhistle/PlayerWhistleEvent'
import { EventType } from '../EventType'
import { PlayerAskForHelpEvent } from '../playerAskForHelp/PlayerAskForHelpEvent'
import { PlayerSuggestCleavageEvent } from '../suggestCleavage/PlayerSuggestCleavageEvent'

feature(EventType.PLAYER_MESSAGE, [
    scenario(`Scenario 1 : ${applicationMessagePrefix + AuthorizedMessage.LEFT}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(player1, applicationMessagePrefix + AuthorizedMessage.LEFT)),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event, new PlayerCleaveEvent(player1, PlayerCleave.LEFT))
    ]),
    scenario(`Scenario 2 : ${applicationMessagePrefix + AuthorizedMessage.RIGHT}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(player1, applicationMessagePrefix + AuthorizedMessage.RIGHT)),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event, new PlayerCleaveEvent(player1, PlayerCleave.RIGHT))
    ]),
    scenario(`Scenario 3 : ${applicationMessagePrefix + AuthorizedMessage.UNSUPPORTED}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(player1, applicationMessagePrefix + AuthorizedMessage.UNSUPPORTED)),
        application => theChatGatewaySendMessageToPlayer(Gherkin.THEN, application.gateways.chat, new MessageForPlayer(player1, dontKnowWhatToDoWithThatMessage(player1)))
    ]),
    scenario(`Scenario 4 : ${AuthorizedMessage.UNSUPPORTED}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(player1, AuthorizedMessage.UNSUPPORTED)),
        application => theChatGatewaySendMessageToPlayer(Gherkin.THEN, application.gateways.chat, [])
    ]),
    scenario(`Scenario 5 : ${applicationMessagePrefix + AuthorizedMessage.RIGHT} with another player ${player2}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(player2, applicationMessagePrefix + AuthorizedMessage.RIGHT)),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event, new PlayerCleaveEvent(player2, PlayerCleave.RIGHT))
    ]),
    scenario(`Scenario 6 : ${`${applicationMessagePrefix}${AuthorizedMessage.SUGGEST_CLEAVAGE} ${cleavageTitle1}`}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(player1, `${applicationMessagePrefix}${AuthorizedMessage.SUGGEST_CLEAVAGE} ${cleavageTitle1}`)),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event, new PlayerSuggestCleavageEvent(player1, new Cleavage(cleavageTitle1)))
    ]),
    scenario(`Scenario 7 : ${`${applicationMessagePrefix}${AuthorizedMessage.HELP}`}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(player1, `${applicationMessagePrefix}${AuthorizedMessage.HELP}`)),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event, new PlayerAskForHelpEvent(player1))
    ]),
    scenario(`Scenario 8 : ${`${applicationMessagePrefix}${AuthorizedMessage.SHORT_HELP}`}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(player1, `${applicationMessagePrefix}${AuthorizedMessage.SHORT_HELP}`)),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event, new PlayerAskForHelpEvent(player1))
    ]),
    scenario(`Scenario 9 : ${`${applicationMessagePrefix}${AuthorizedMessage.SHORT_APPLAUSE}`}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(player1, `${applicationMessagePrefix}${AuthorizedMessage.SHORT_APPLAUSE}`)),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event, new PlayerApplauseEvent())
    ]),
    scenario(`Scenario 10 : ${`${applicationMessagePrefix}${AuthorizedMessage.SHORT_SHOOT}`}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(player1, `${applicationMessagePrefix}${AuthorizedMessage.SHORT_SHOOT}`)),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event, new PlayerShootEvent())
    ]),
    scenario(`Scenario 11 : ${`${applicationMessagePrefix}${AuthorizedMessage.SHORT_HYPERLIKE}`}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(player1, `${applicationMessagePrefix}${AuthorizedMessage.SHORT_HYPERLIKE}`)),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event, new PlayerHyperLikeEvent())
    ]),
    scenario(`Scenario 12 : ${`${applicationMessagePrefix}${AuthorizedMessage.SHORT_WHISTLE}`}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(player1, `${applicationMessagePrefix}${AuthorizedMessage.SHORT_WHISTLE}`)),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event, new PlayerWhistleEvent())
    ])
])
