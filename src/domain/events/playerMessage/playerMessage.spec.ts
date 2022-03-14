import { PlayerCleave } from '../../entities/PlayerCleave'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'

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
import { theChatGatewaySendMessageToPlayer } from '../../tests/unitTests/chatGateway'
import { whenEventOccurs, theEventIsSent } from '../../tests/unitTests/eventGateway'

feature(EventType.PLAYER_MESSAGE, [
    clientScenario(`Scenario 1 : ${applicationMessagePrefix + AuthorizedMessage.LEFT}`, [
        app => whenEventOccurs(app, new PlayerMessageEvent(player1(), applicationMessagePrefix + AuthorizedMessage.LEFT)),
        app => theEventIsSent(Gherkin.THEN, app, new PlayerCleaveEvent(player1(), PlayerCleave.LEFT))
    ]),
    clientScenario(`Scenario 2 : ${applicationMessagePrefix + AuthorizedMessage.RIGHT}`, [
        app => whenEventOccurs(app, new PlayerMessageEvent(player1(), applicationMessagePrefix + AuthorizedMessage.RIGHT)),
        app => theEventIsSent(Gherkin.THEN, app, new PlayerCleaveEvent(player1(), PlayerCleave.RIGHT))
    ]),
    clientScenario(`Scenario 3 : ${applicationMessagePrefix + AuthorizedMessage.UNSUPPORTED}`, [
        app => whenEventOccurs(app, new PlayerMessageEvent(player1(), applicationMessagePrefix + AuthorizedMessage.UNSUPPORTED)),
        app => theChatGatewaySendMessageToPlayer(Gherkin.THEN, app, new MessageForPlayer(player1(), dontKnowWhatToDoWithThatMessage(player1())))
    ]),
    clientScenario(`Scenario 4 : ${AuthorizedMessage.UNSUPPORTED}`, [
        app => whenEventOccurs(app, new PlayerMessageEvent(player1(), AuthorizedMessage.UNSUPPORTED)),
        app => theChatGatewaySendMessageToPlayer(Gherkin.THEN, app, [])
    ]),
    clientScenario(`Scenario 5 : ${applicationMessagePrefix + AuthorizedMessage.RIGHT} with another player ${JSON.stringify(player2)}`, [
        app => whenEventOccurs(app, new PlayerMessageEvent(player2(), applicationMessagePrefix + AuthorizedMessage.RIGHT)),
        app => theEventIsSent(Gherkin.THEN, app, new PlayerCleaveEvent(player2(), PlayerCleave.RIGHT))
    ]),
    clientScenario(`Scenario 6 : ${`${applicationMessagePrefix}${AuthorizedMessage.SUGGEST_CLEAVAGE} ${cleavageTitle1}`}`, [
        app => whenEventOccurs(app, new PlayerMessageEvent(player1(), `${applicationMessagePrefix}${AuthorizedMessage.SUGGEST_CLEAVAGE} ${cleavageTitle1}`)),
        app => theEventIsSent(Gherkin.THEN, app, new PlayerSuggestCleavageEvent(player1(), new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [] }, rightChoice: { name: 'Drouate', players: [] }, players: [] })))
    ]),
    clientScenario(`Scenario 7 : ${`${applicationMessagePrefix}${AuthorizedMessage.HELP}`}`, [
        app => whenEventOccurs(app, new PlayerMessageEvent(player1(), `${applicationMessagePrefix}${AuthorizedMessage.HELP}`)),
        app => theEventIsSent(Gherkin.THEN, app, new PlayerAskForHelpEvent(player1()))
    ]),
    clientScenario(`Scenario 8 : ${`${applicationMessagePrefix}${AuthorizedMessage.SHORT_HELP}`}`, [
        app => whenEventOccurs(app, new PlayerMessageEvent(player1(), `${applicationMessagePrefix}${AuthorizedMessage.SHORT_HELP}`)),
        app => theEventIsSent(Gherkin.THEN, app, new PlayerAskForHelpEvent(player1()))
    ]),
    clientScenario(`Scenario 9 : ${`${applicationMessagePrefix}${AuthorizedMessage.SHORT_APPLAUSE}`}`, [
        app => whenEventOccurs(app, new PlayerMessageEvent(player1(), `${applicationMessagePrefix}${AuthorizedMessage.SHORT_APPLAUSE}`)),
        app => theEventIsSent(Gherkin.THEN, app, new PlayerApplauseEvent())
    ]),
    clientScenario(`Scenario 10 : ${`${applicationMessagePrefix}${AuthorizedMessage.SHORT_SHOOT}`}`, [
        app => whenEventOccurs(app, new PlayerMessageEvent(player1(), `${applicationMessagePrefix}${AuthorizedMessage.SHORT_SHOOT}`)),
        app => theEventIsSent(Gherkin.THEN, app, new PlayerShootEvent())
    ]),
    clientScenario(`Scenario 11 : ${`${applicationMessagePrefix}${AuthorizedMessage.SHORT_HYPERLIKE}`}`, [
        app => whenEventOccurs(app, new PlayerMessageEvent(player1(), `${applicationMessagePrefix}${AuthorizedMessage.SHORT_HYPERLIKE}`)),
        app => theEventIsSent(Gherkin.THEN, app, new PlayerHyperLikeEvent())
    ]),
    clientScenario(`Scenario 12 : ${`${applicationMessagePrefix}${AuthorizedMessage.SHORT_WHISTLE}`}`, [
        app => whenEventOccurs(app, new PlayerMessageEvent(player1(), `${applicationMessagePrefix}${AuthorizedMessage.SHORT_WHISTLE}`)),
        app => theEventIsSent(Gherkin.THEN, app, new PlayerWhistleEvent())
    ])
])
