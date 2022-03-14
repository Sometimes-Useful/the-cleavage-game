import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { InterfaceView } from '../../entities/InterfaceView'
import { ChatStatus } from '../../entities/ChatStatus'
import { LaunchCleavageEvent } from './LaunchCleavageEvent'
import { Cleavage } from '../../entities/Cleavage'
import { cleavageTitle1, player1, player2 } from '../../tests/testContexts'
import { EventType } from '../EventType'
import { NavigateEvent } from '../navigateEvent/NavigateEvent'
import { theInterfaceGatewayDontHaveCleavage, theInterfaceGatewayHasCurrentCleavage, theInterfaceGatewayHasCurrentView } from '../../tests/unitTests/interfaceGateway'
import { theChatGatewayHasExpectedStatus } from '../../tests/unitTests/chatGateway'
import { theCurrentCleavageRepositoryHasCleavage, theGlobalCleavageDrawPileGatewayDontHaveCleavages, theGlobalCleavageDrawPileGatewayHasCleavages } from '../../tests/unitTests/cleavageRepository'

import { thePlayerRepositoryHasPlayers } from '../../tests/unitTests/playerRepository'
import { whenEventOccurs, theEventIsSent } from '../../tests/unitTests/eventGateway'
import { Choice } from '../../entities/Choice'
import { GamePhase } from '../../entities/GamePhase'
import { ChangeGamePhaseEvent } from '../changeGamePhase/ChangeGamePhaseEvent'

const leftChoice:Choice = new Choice({ name: 'Gôche', players: [] })
const rightChoice:Choice = new Choice({ name: 'Drouate', players: [] })
feature(EventType.LAUNCH_CLEAVAGE, [
    clientScenario(`Scenario 1 : Apply current cleavage and change game phase to ${GamePhase.CLEAVING} on event.`, [
        app => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, app, InterfaceView.GAME),
        app => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, app, ChatStatus.CONNECTED),
        app => thePlayerRepositoryHasPlayers(Gherkin.AND_GIVEN, app, [player1()]),
        app => theInterfaceGatewayDontHaveCleavage(Gherkin.AND_GIVEN, app),
        app => whenEventOccurs(app, new LaunchCleavageEvent(cleavageTitle1, 'Gôche', 'Drouate')),
        app => theInterfaceGatewayHasCurrentView(Gherkin.THEN, app, InterfaceView.GAME),
        app => theEventIsSent(Gherkin.AND_THEN, app, new ChangeGamePhaseEvent(GamePhase.CLEAVING)),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, app, new Cleavage({ title: cleavageTitle1, leftChoice: leftChoice.toDTO(), rightChoice: rightChoice.toDTO(), players: [player1()] })),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, app, new Cleavage({ title: cleavageTitle1, leftChoice: leftChoice.toDTO(), rightChoice: rightChoice.toDTO(), players: [player1()] }))
    ]),
    clientScenario(`Scenario 2 : Navigate to ${InterfaceView.CONNECT_CHAT} on chat gateway ${ChatStatus.DISCONNECTED}.`, [
        app => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, app, InterfaceView.GAME),
        app => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, app, ChatStatus.DISCONNECTED),
        app => whenEventOccurs(app, new LaunchCleavageEvent(cleavageTitle1, 'Gôche', 'Drouate')),
        app => theEventIsSent(Gherkin.THEN, app, new NavigateEvent(InterfaceView.CONNECT_CHAT)),
        app => theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, app, InterfaceView.GAME),
        app => theInterfaceGatewayDontHaveCleavage(Gherkin.AND_THEN, app)
    ]),
    clientScenario('Scenario 3 : Cleavage saved on global cleavage repository on launch', [
        app => theGlobalCleavageDrawPileGatewayDontHaveCleavages(Gherkin.GIVEN, app),
        app => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, app, ChatStatus.CONNECTED),
        app => thePlayerRepositoryHasPlayers(Gherkin.AND_GIVEN, app, [player1(), player2()]),
        app => whenEventOccurs(app, new LaunchCleavageEvent(cleavageTitle1, 'Gôche', 'Drouate')),
        app => theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.THEN, app, new Cleavage({ title: cleavageTitle1, leftChoice: leftChoice.toDTO(), rightChoice: rightChoice.toDTO(), players: [] }))
    ]),
    clientScenario('Scenario 4 : Custom Cleavage.', [
        app => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, app, InterfaceView.GAME),
        app => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, app, ChatStatus.CONNECTED),
        app => thePlayerRepositoryHasPlayers(Gherkin.AND_GIVEN, app, [player1()]),
        app => theInterfaceGatewayDontHaveCleavage(Gherkin.AND_GIVEN, app),
        app => whenEventOccurs(app, new LaunchCleavageEvent(cleavageTitle1, 'yes', 'no')),
        app => theInterfaceGatewayHasCurrentView(Gherkin.THEN, app, InterfaceView.GAME),
        app => theEventIsSent(Gherkin.AND_THEN, app, new ChangeGamePhaseEvent(GamePhase.CLEAVING)),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, app, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'yes', players: [] }, rightChoice: { name: 'no', players: [] }, players: [player1()] })),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, app, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'yes', players: [] }, rightChoice: { name: 'no', players: [] }, players: [player1()] }))
    ])
])
