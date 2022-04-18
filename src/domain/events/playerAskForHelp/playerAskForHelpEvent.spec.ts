import { Gherkin } from '../../tests/Gherkin'

import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { player1 } from '../../tests/testContexts'
import { MessageForPlayer } from '../../entities/MessageForPlayer'
import { helpMessage } from '../../entities/playerMessages'
import { EventType } from '../EventType'
import { PlayerAskForHelpEvent } from './PlayerAskForHelpEvent'
import { theChatGatewaySendMessageToPlayer } from '../../tests/unitTests/chatGateway'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'

feature(EventType.PLAYER_ASK_FOR_HELP, [
    clientScenario('Scenario 1 : player ask for help', [
        app => whenEventOccurs(app, new PlayerAskForHelpEvent(player1().username)),
        app => theChatGatewaySendMessageToPlayer(Gherkin.THEN, app, new MessageForPlayer(player1().username, helpMessage))
    ])
])
