import { feature, scenario } from '../../tests/testSuites'
import { theChatGatewaySendMessageToPlayer, theCleavageRepositoryDontHaveCurrentCleavage, theCleavageRepositoryHasCurrentCleavage, theInterfaceGatewayHasCurrentCleavage, theInterfaceGatewayHasCurrentView, whenEventOccurs } from '../../tests/unitTests'
import { PlayerCleave } from '../../entities/PlayerCleave'
import { PlayerCleaveEvent } from './PlayerCleaveEvent'
import { Gherkin } from '../../tests/Gherkin'
import { Cleavage } from '../../entities/Cleavage'
import { cleavageTitle1, player1 } from '../../tests/testContexts'
import { MessageForPlayer, noCleavagePleaseWait } from '../../entities/MessageForPlayer'
import { InterfaceView } from '../../entities/InterfaceView'
import { waitForCleavageLaunchMessage } from '../../entities/playerMessages'
import { EventType } from '../EventType'

feature(EventType.PLAYER_CLEAVE, [
    scenario(`Scenario 1 : ${PlayerCleave.LEFT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.CURRENT_CLEAVAGE),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle1)),
        application => whenEventOccurs(application.gateways.event, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.THEN, application.repositories.cleavage, new Cleavage(cleavageTitle1, 1, 0, new Map([[player1, PlayerCleave.LEFT]]))),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application.gateways.interface, new Cleavage(cleavageTitle1, 1, 0, new Map([[player1, PlayerCleave.LEFT]])))
    ]),
    scenario(`Scenario 2 : ${PlayerCleave.RIGHT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.CURRENT_CLEAVAGE),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle1)),
        application => whenEventOccurs(application.gateways.event, new PlayerCleaveEvent(player1, PlayerCleave.RIGHT)),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.THEN, application.repositories.cleavage, new Cleavage(cleavageTitle1, 0, 1, new Map([[player1, PlayerCleave.RIGHT]]))),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application.gateways.interface, new Cleavage(cleavageTitle1, 0, 1, new Map([[player1, PlayerCleave.RIGHT]])))
    ]),
    scenario(`Scenario 3 : Already ${PlayerCleave.RIGHT} for ${player1} and player cleave ${PlayerCleave.RIGHT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.CURRENT_CLEAVAGE),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle1, 0, 1, new Map([[player1, PlayerCleave.RIGHT]]))),
        application => whenEventOccurs(application.gateways.event, new PlayerCleaveEvent(player1, PlayerCleave.RIGHT)),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.THEN, application.repositories.cleavage, new Cleavage(cleavageTitle1, 0, 1, new Map([[player1, PlayerCleave.RIGHT]]))),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application.gateways.chat, new MessageForPlayer(player1, `You have still cleave ${PlayerCleave.RIGHT}`)),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application.gateways.interface, new Cleavage(cleavageTitle1, 0, 1, new Map([[player1, PlayerCleave.RIGHT]])))
    ]),
    scenario(`Scenario 4 : Already ${PlayerCleave.LEFT} for ${player1} and player cleave ${PlayerCleave.LEFT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.CURRENT_CLEAVAGE),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle1, 1, 0, new Map([[player1, PlayerCleave.LEFT]]))),
        application => whenEventOccurs(application.gateways.event, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.THEN, application.repositories.cleavage, new Cleavage(cleavageTitle1, 1, 0, new Map([[player1, PlayerCleave.LEFT]]))),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application.gateways.chat, new MessageForPlayer(player1, `You have still cleave ${PlayerCleave.LEFT}`)),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application.gateways.interface, new Cleavage(cleavageTitle1, 1, 0, new Map([[player1, PlayerCleave.LEFT]])))
    ]),
    scenario(`Scenario 5 : Already ${PlayerCleave.LEFT} for ${player1} and player cleave ${PlayerCleave.RIGHT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.CURRENT_CLEAVAGE),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle1, 1, 0, new Map([[player1, PlayerCleave.LEFT]]))),
        application => whenEventOccurs(application.gateways.event, new PlayerCleaveEvent(player1, PlayerCleave.RIGHT)),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.THEN, application.repositories.cleavage, new Cleavage(cleavageTitle1, 0, 1, new Map([[player1, PlayerCleave.RIGHT]]))),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application.gateways.interface, new Cleavage(cleavageTitle1, 0, 1, new Map([[player1, PlayerCleave.RIGHT]])))
    ]),
    scenario(`Scenario 6 : Already ${PlayerCleave.RIGHT} for ${player1} and player cleave ${PlayerCleave.LEFT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.CURRENT_CLEAVAGE),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle1, 0, 1, new Map([[player1, PlayerCleave.RIGHT]]))),
        application => whenEventOccurs(application.gateways.event, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.THEN, application.repositories.cleavage, new Cleavage(cleavageTitle1, 1, 0, new Map([[player1, PlayerCleave.LEFT]]))),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application.gateways.interface, new Cleavage(cleavageTitle1, 1, 0, new Map([[player1, PlayerCleave.LEFT]])))
    ]),
    scenario('Scenario 7 : No cleavage.', [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.CURRENT_CLEAVAGE),
        application => theCleavageRepositoryDontHaveCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage),
        application => whenEventOccurs(application.gateways.event, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => theCleavageRepositoryDontHaveCurrentCleavage(Gherkin.THEN, application.repositories.cleavage),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application.gateways.chat, noCleavagePleaseWait(player1))
    ]),
    scenario('Scenario 8 : Wait for launched cleavage.', [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.NEW_CLEAVAGE),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle1, 0, 1, new Map([[player1, PlayerCleave.RIGHT]]))),
        application => whenEventOccurs(application.gateways.event, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.THEN, application.repositories.cleavage, new Cleavage(cleavageTitle1, 0, 1, new Map([[player1, PlayerCleave.RIGHT]]))),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application.gateways.chat, new MessageForPlayer(player1, waitForCleavageLaunchMessage))
    ])
])
