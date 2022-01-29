import { feature, scenario } from '../../tests/testSuites'

import { PlayerCleave } from '../../entities/PlayerCleave'
import { PlayerCleaveEvent } from './PlayerCleaveEvent'
import { Gherkin } from '../../tests/Gherkin'
import { Cleavage } from '../../entities/Cleavage'
import { cleavageTitle1, player1 } from '../../tests/testContexts'
import { MessageForPlayer, noCleavagePleaseWait } from '../../entities/MessageForPlayer'
import { InterfaceView } from '../../entities/InterfaceView'
import { waitForCleavageLaunchMessage } from '../../entities/playerMessages'
import { EventType } from '../EventType'
import { theInterfaceGatewayHasCurrentCleavage, theInterfaceGatewayHasCurrentView } from '../../tests/unitTests/interfaceGateway'
import { theChatGatewaySendMessageToPlayer } from '../../tests/unitTests/chatGateway'
import { theCurrentCleavageRepositoryHasCleavage, theCurrentCleavageRepositoryDontHaveCleavage } from '../../tests/unitTests/cleavageRepository'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { thePlayerRepositoryDontHavePlayers, thePlayerRepositoryHasPlayers } from '../../tests/unitTests/playerRepository'

feature(EventType.PLAYER_CLEAVE, [
    scenario(`Scenario 1 : ${PlayerCleave.LEFT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.GIVEN, application, new Cleavage(cleavageTitle1)),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.LEFT]]))),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.LEFT]])))
    ]),
    scenario(`Scenario 2 : ${PlayerCleave.RIGHT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.GIVEN, application, new Cleavage(cleavageTitle1)),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.RIGHT)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.RIGHT]]))),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.RIGHT]])))
    ]),
    scenario(`Scenario 3 : Already ${PlayerCleave.RIGHT} for ${JSON.stringify(player1)} and player cleave ${PlayerCleave.RIGHT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.GIVEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.RIGHT]]))),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.RIGHT)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.RIGHT]]))),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application, new MessageForPlayer(player1, `You have still cleave ${PlayerCleave.RIGHT}`)),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.RIGHT]])))
    ]),
    scenario(`Scenario 4 : Already ${PlayerCleave.LEFT} for ${JSON.stringify(player1)} and player cleave ${PlayerCleave.LEFT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.GIVEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.LEFT]]))),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.LEFT]]))),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application, new MessageForPlayer(player1, `You have still cleave ${PlayerCleave.LEFT}`)),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.LEFT]])))
    ]),
    scenario(`Scenario 5 : Already ${PlayerCleave.LEFT} for ${JSON.stringify(player1)} and player cleave ${PlayerCleave.RIGHT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.GIVEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.LEFT]]))),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.RIGHT)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.RIGHT]]))),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.RIGHT]])))
    ]),
    scenario(`Scenario 6 : Already ${PlayerCleave.RIGHT} for ${JSON.stringify(player1)} and player cleave ${PlayerCleave.LEFT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.GIVEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.RIGHT]]))),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.LEFT]]))),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.LEFT]])))
    ]),
    scenario('Scenario 7 : No cleavage.', [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryDontHaveCleavage(Gherkin.GIVEN, application),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => theCurrentCleavageRepositoryDontHaveCleavage(Gherkin.THEN, application),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application, noCleavagePleaseWait(player1))
    ]),
    scenario('Scenario 8 : Wait for launched cleavage.', [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.NEW_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.GIVEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.RIGHT]]))),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.RIGHT]]))),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application, new MessageForPlayer(player1, waitForCleavageLaunchMessage))
    ]),
    scenario('Scenario 9 : new player', [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, application, new Cleavage(cleavageTitle1, new Map([]))),
        application => thePlayerRepositoryDontHavePlayers(Gherkin.AND_GIVEN, application),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => thePlayerRepositoryHasPlayers(Gherkin.THEN, application, player1),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.LEFT]])))
    ]),
    scenario('Scenario 10 : player already added', [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, application, new Cleavage(cleavageTitle1, new Map([]))),
        application => thePlayerRepositoryHasPlayers(Gherkin.AND_GIVEN, application, player1),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => thePlayerRepositoryHasPlayers(Gherkin.THEN, application, player1),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, application, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.LEFT]])))
    ])
])
