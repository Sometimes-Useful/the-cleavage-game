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
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { thePlayerRepositoryDontHavePlayers, thePlayerRepositoryHasPlayers } from '../../tests/unitTests/playerRepository'
import type { Player } from '../../entities/Player'
import { PlayerJoinBarEvent } from '../playerJoinBar/PlayerJoinBarEvent'
import { GamePhase } from '../../entities/GamePhase'
import { theGamePhaseRepositoryHasPhase } from '../../tests/unitTests/gamePhaseRepository'
const cleaveWithoutPlayer = () => new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [] }, rightChoice: { name: 'Drouate', players: [] }, players: [] })
const cleaveWithPlayerLeft = (player:Player) => new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [player.username] }, rightChoice: { name: 'Drouate', players: [] }, players: [player.username] })
const cleaveWithPlayerRight = (player:Player) => new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [] }, rightChoice: { name: 'Drouate', players: [player.username] }, players: [player.username] })
feature(EventType.PLAYER_CLEAVE, [
    clientScenario(`Scenario 1 : ${PlayerCleave.LEFT}`, [
        theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, InterfaceView.GAME),
        theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, GamePhase.CLEAVING),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, cleaveWithoutPlayer()),
        whenEventOccurs(new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT)),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, cleaveWithPlayerLeft(player1())),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, cleaveWithPlayerLeft(player1()))
    ]),
    clientScenario(`Scenario 2 : ${PlayerCleave.RIGHT}`, [
        theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, InterfaceView.GAME),
        theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, GamePhase.CLEAVING),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, cleaveWithoutPlayer()),
        whenEventOccurs(new PlayerCleaveEvent(player1().username, PlayerCleave.RIGHT)),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, cleaveWithPlayerRight(player1())),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, cleaveWithPlayerRight(player1()))
    ]),
    clientScenario(`Scenario 3 : Already ${PlayerCleave.RIGHT} for ${JSON.stringify(player1())} and player cleave ${PlayerCleave.RIGHT}`, [
        theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, InterfaceView.GAME),
        theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, GamePhase.CLEAVING),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, cleaveWithPlayerRight(player1())),
        whenEventOccurs(new PlayerCleaveEvent(player1().username, PlayerCleave.RIGHT)),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, cleaveWithPlayerRight(player1())),
        theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, new MessageForPlayer(player1().username, `You have still cleave ${PlayerCleave.RIGHT}`)),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, cleaveWithPlayerRight(player1()))
    ]),
    clientScenario(`Scenario 4 : Already ${PlayerCleave.LEFT} for ${JSON.stringify(player1())} and player cleave ${PlayerCleave.LEFT}`, [
        theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, InterfaceView.GAME),
        theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, GamePhase.CLEAVING),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, cleaveWithPlayerLeft(player1())),
        whenEventOccurs(new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT)),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, cleaveWithPlayerLeft(player1())),
        theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, new MessageForPlayer(player1().username, `You have still cleave ${PlayerCleave.LEFT}`)),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, cleaveWithPlayerLeft(player1()))
    ]),
    clientScenario(`Scenario 5 : Already ${PlayerCleave.LEFT} for ${JSON.stringify(player1())} and player cleave ${PlayerCleave.RIGHT}`, [
        theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, InterfaceView.GAME),
        theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, GamePhase.CLEAVING),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, cleaveWithPlayerLeft(player1())),
        whenEventOccurs(new PlayerCleaveEvent(player1().username, PlayerCleave.RIGHT)),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, cleaveWithPlayerRight(player1())),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, cleaveWithPlayerRight(player1()))
    ]),
    clientScenario(`Scenario 6 : Already ${PlayerCleave.RIGHT} for ${JSON.stringify(player1())} and player cleave ${PlayerCleave.LEFT}`, [
        theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, InterfaceView.GAME),
        theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, GamePhase.CLEAVING),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, cleaveWithPlayerRight(player1())),
        whenEventOccurs(new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT)),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, cleaveWithPlayerLeft(player1())),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, cleaveWithPlayerLeft(player1()))
    ]),
    clientScenario('Scenario 7 : No cleavage.', [
        theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, InterfaceView.GAME),
        theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, GamePhase.CLEAVING),
        theCurrentCleavageRepositoryDontHaveCleavage(Gherkin.AND_GIVEN),
        whenEventOccurs(new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT)),
        theCurrentCleavageRepositoryDontHaveCleavage(Gherkin.THEN),
        theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, noCleavagePleaseWait(player1().username))
    ]),
    clientScenario('Scenario 8 : Wait for launched cleavage.', [
        theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, InterfaceView.GAME),
        theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, GamePhase.NEW_CLEAVAGE),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, cleaveWithPlayerRight(player1())),
        whenEventOccurs(new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT)),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, cleaveWithPlayerRight(player1())),
        theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, new MessageForPlayer(player1().username, waitForCleavageLaunchMessage))
    ]),
    clientScenario('Scenario 9 : new player', [
        theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, InterfaceView.GAME),
        theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, GamePhase.CLEAVING),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, cleaveWithoutPlayer()),
        thePlayerRepositoryDontHavePlayers(Gherkin.AND_GIVEN),
        whenEventOccurs(new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT)),
        thePlayerRepositoryHasPlayers(Gherkin.THEN, [player1()]),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, cleaveWithPlayerLeft(player1())),
        theEventIsSent(Gherkin.AND_THEN, new PlayerJoinBarEvent(player1().username))
    ]),
    clientScenario('Scenario 10 : player already added', [
        theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, InterfaceView.GAME),
        theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, GamePhase.CLEAVING),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, cleaveWithoutPlayer()),
        thePlayerRepositoryHasPlayers(Gherkin.AND_GIVEN, [player1()]),
        whenEventOccurs(new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT)),
        thePlayerRepositoryHasPlayers(Gherkin.THEN, [player1()]),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, cleaveWithPlayerLeft(player1())),
        theEventIsSent(Gherkin.AND_THEN, [])
    ])
])
