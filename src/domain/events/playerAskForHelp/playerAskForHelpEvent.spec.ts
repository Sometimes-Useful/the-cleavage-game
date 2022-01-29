import { Gherkin } from '../../tests/Gherkin'

import { feature, scenario } from '../../tests/testSuites'
import { player1 } from '../../tests/testContexts'
import { MessageForPlayer } from '../../entities/MessageForPlayer'
import { helpMessage } from '../../entities/playerMessages'
import { EventType } from '../EventType'
import { PlayerAskForHelpEvent } from './PlayerAskForHelpEvent'
import { theChatGatewaySendMessageToPlayer } from '../../tests/unitTests/chatGateway'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'

feature(EventType.PLAYER_ASK_FOR_HELP, [
    scenario('Scenario 1 : player ask for help', [
        application => whenEventOccurs(application, new PlayerAskForHelpEvent(player1)),
        application => theChatGatewaySendMessageToPlayer(Gherkin.THEN, application, new MessageForPlayer(player1, helpMessage))
    ])
])
