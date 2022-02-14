import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
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
import type { Player } from '../../entities/Player'
const cleaveWithoutPlayer = () => new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [] }, rightChoice: { name: 'Drouate', players: [] }, players: [] })
const cleaveWithPlayerLeft = (player:Player) => new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [player] }, rightChoice: { name: 'Drouate', players: [] }, players: [player] })
const cleaveWithPlayerRight = (player:Player) => new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [] }, rightChoice: { name: 'Drouate', players: [player] }, players: [player] })
feature(EventType.PLAYER_CLEAVE, [
    clientScenario(`Scenario 1 : ${PlayerCleave.LEFT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, application, cleaveWithoutPlayer()),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, cleaveWithPlayerLeft(player1)),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, cleaveWithPlayerLeft(player1))
    ]),
    clientScenario(`Scenario 2 : ${PlayerCleave.RIGHT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, application, cleaveWithoutPlayer()),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.RIGHT)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, cleaveWithPlayerRight(player1)),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, cleaveWithPlayerRight(player1))
    ]),
    clientScenario(`Scenario 3 : Already ${PlayerCleave.RIGHT} for ${JSON.stringify(player1)} and player cleave ${PlayerCleave.RIGHT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, application, cleaveWithPlayerRight(player1)),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.RIGHT)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, cleaveWithPlayerRight(player1)),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application, new MessageForPlayer(player1, `You have still cleave ${PlayerCleave.RIGHT}`)),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, cleaveWithPlayerRight(player1))
    ]),
    clientScenario(`Scenario 4 : Already ${PlayerCleave.LEFT} for ${JSON.stringify(player1)} and player cleave ${PlayerCleave.LEFT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, application, cleaveWithPlayerLeft(player1)),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, cleaveWithPlayerLeft(player1)),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application, new MessageForPlayer(player1, `You have still cleave ${PlayerCleave.LEFT}`)),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, cleaveWithPlayerLeft(player1))
    ]),
    clientScenario(`Scenario 5 : Already ${PlayerCleave.LEFT} for ${JSON.stringify(player1)} and player cleave ${PlayerCleave.RIGHT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, application, cleaveWithPlayerLeft(player1)),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.RIGHT)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, cleaveWithPlayerRight(player1)),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, cleaveWithPlayerRight(player1))
    ]),
    clientScenario(`Scenario 6 : Already ${PlayerCleave.RIGHT} for ${JSON.stringify(player1)} and player cleave ${PlayerCleave.LEFT}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, application, cleaveWithPlayerRight(player1)),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, cleaveWithPlayerLeft(player1)),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, cleaveWithPlayerLeft(player1))
    ]),
    clientScenario('Scenario 7 : No cleavage.', [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryDontHaveCleavage(Gherkin.AND_GIVEN, application),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => theCurrentCleavageRepositoryDontHaveCleavage(Gherkin.THEN, application),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application, noCleavagePleaseWait(player1))
    ]),
    clientScenario('Scenario 8 : Wait for launched cleavage.', [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.NEW_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, application, cleaveWithPlayerRight(player1)),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, cleaveWithPlayerRight(player1)),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application, new MessageForPlayer(player1, waitForCleavageLaunchMessage))
    ]),
    clientScenario('Scenario 9 : new player', [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, application, cleaveWithoutPlayer()),
        application => thePlayerRepositoryDontHavePlayers(Gherkin.AND_GIVEN, application),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => thePlayerRepositoryHasPlayers(Gherkin.THEN, application, player1),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, application, cleaveWithPlayerLeft(player1))
    ]),
    clientScenario('Scenario 10 : player already added', [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.CURRENT_CLEAVAGE),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, application, cleaveWithoutPlayer()),
        application => thePlayerRepositoryHasPlayers(Gherkin.AND_GIVEN, application, player1),
        application => whenEventOccurs(application, new PlayerCleaveEvent(player1, PlayerCleave.LEFT)),
        application => thePlayerRepositoryHasPlayers(Gherkin.THEN, application, player1),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, application, cleaveWithPlayerLeft(player1))
    ])
])
