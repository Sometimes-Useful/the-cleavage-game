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
        app => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, app, InterfaceView.GAME),
        app => theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, app, GamePhase.CLEAVING),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, cleaveWithoutPlayer()),
        app => whenEventOccurs(app, new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT)),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, app, cleaveWithPlayerLeft(player1())),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, app, cleaveWithPlayerLeft(player1()))
    ]),
    clientScenario(`Scenario 2 : ${PlayerCleave.RIGHT}`, [
        app => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, app, InterfaceView.GAME),
        app => theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, app, GamePhase.CLEAVING),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, cleaveWithoutPlayer()),
        app => whenEventOccurs(app, new PlayerCleaveEvent(player1().username, PlayerCleave.RIGHT)),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, app, cleaveWithPlayerRight(player1())),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, app, cleaveWithPlayerRight(player1()))
    ]),
    clientScenario(`Scenario 3 : Already ${PlayerCleave.RIGHT} for ${JSON.stringify(player1())} and player cleave ${PlayerCleave.RIGHT}`, [
        app => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, app, InterfaceView.GAME),
        app => theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, app, GamePhase.CLEAVING),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, cleaveWithPlayerRight(player1())),
        app => whenEventOccurs(app, new PlayerCleaveEvent(player1().username, PlayerCleave.RIGHT)),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, app, cleaveWithPlayerRight(player1())),
        app => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, app, new MessageForPlayer(player1().username, `You have still cleave ${PlayerCleave.RIGHT}`)),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, app, cleaveWithPlayerRight(player1()))
    ]),
    clientScenario(`Scenario 4 : Already ${PlayerCleave.LEFT} for ${JSON.stringify(player1())} and player cleave ${PlayerCleave.LEFT}`, [
        app => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, app, InterfaceView.GAME),
        app => theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, app, GamePhase.CLEAVING),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, cleaveWithPlayerLeft(player1())),
        app => whenEventOccurs(app, new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT)),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, app, cleaveWithPlayerLeft(player1())),
        app => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, app, new MessageForPlayer(player1().username, `You have still cleave ${PlayerCleave.LEFT}`)),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, app, cleaveWithPlayerLeft(player1()))
    ]),
    clientScenario(`Scenario 5 : Already ${PlayerCleave.LEFT} for ${JSON.stringify(player1())} and player cleave ${PlayerCleave.RIGHT}`, [
        app => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, app, InterfaceView.GAME),
        app => theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, app, GamePhase.CLEAVING),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, cleaveWithPlayerLeft(player1())),
        app => whenEventOccurs(app, new PlayerCleaveEvent(player1().username, PlayerCleave.RIGHT)),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, app, cleaveWithPlayerRight(player1())),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, app, cleaveWithPlayerRight(player1()))
    ]),
    clientScenario(`Scenario 6 : Already ${PlayerCleave.RIGHT} for ${JSON.stringify(player1())} and player cleave ${PlayerCleave.LEFT}`, [
        app => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, app, InterfaceView.GAME),
        app => theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, app, GamePhase.CLEAVING),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, cleaveWithPlayerRight(player1())),
        app => whenEventOccurs(app, new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT)),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, app, cleaveWithPlayerLeft(player1())),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, app, cleaveWithPlayerLeft(player1()))
    ]),
    clientScenario('Scenario 7 : No cleavage.', [
        app => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, app, InterfaceView.GAME),
        app => theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, app, GamePhase.CLEAVING),
        app => theCurrentCleavageRepositoryDontHaveCleavage(Gherkin.AND_GIVEN, app),
        app => whenEventOccurs(app, new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT)),
        app => theCurrentCleavageRepositoryDontHaveCleavage(Gherkin.THEN, app),
        app => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, app, noCleavagePleaseWait(player1().username))
    ]),
    clientScenario('Scenario 8 : Wait for launched cleavage.', [
        app => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, app, InterfaceView.GAME),
        app => theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, app, GamePhase.NEW_CLEAVAGE),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, cleaveWithPlayerRight(player1())),
        app => whenEventOccurs(app, new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT)),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, app, cleaveWithPlayerRight(player1())),
        app => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, app, new MessageForPlayer(player1().username, waitForCleavageLaunchMessage))
    ]),
    clientScenario('Scenario 9 : new player', [
        app => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, app, InterfaceView.GAME),
        app => theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, app, GamePhase.CLEAVING),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, cleaveWithoutPlayer()),
        app => thePlayerRepositoryDontHavePlayers(Gherkin.AND_GIVEN, app),
        app => whenEventOccurs(app, new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT)),
        app => thePlayerRepositoryHasPlayers(Gherkin.THEN, app, [player1()]),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, app, cleaveWithPlayerLeft(player1())),
        app => theEventIsSent(Gherkin.AND_THEN, app, new PlayerJoinBarEvent(player1().username))
    ]),
    clientScenario('Scenario 10 : player already added', [
        app => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, app, InterfaceView.GAME),
        app => theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, app, GamePhase.CLEAVING),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, cleaveWithoutPlayer()),
        app => thePlayerRepositoryHasPlayers(Gherkin.AND_GIVEN, app, [player1()]),
        app => whenEventOccurs(app, new PlayerCleaveEvent(player1().username, PlayerCleave.LEFT)),
        app => thePlayerRepositoryHasPlayers(Gherkin.THEN, app, [player1()]),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, app, cleaveWithPlayerLeft(player1())),
        app => theEventIsSent(Gherkin.AND_THEN, app, [])
    ])
])
