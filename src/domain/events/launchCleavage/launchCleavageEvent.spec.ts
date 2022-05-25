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
        theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, InterfaceView.GAME),
        theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, ChatStatus.CONNECTED),
        thePlayerRepositoryHasPlayers(Gherkin.AND_GIVEN, [player1()]),
        theInterfaceGatewayDontHaveCleavage(Gherkin.AND_GIVEN),
        whenEventOccurs(new LaunchCleavageEvent(cleavageTitle1, 'Gôche', 'Drouate')),
        theInterfaceGatewayHasCurrentView(Gherkin.THEN, InterfaceView.GAME),
        theEventIsSent(Gherkin.AND_THEN, new ChangeGamePhaseEvent(GamePhase.CLEAVING)),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, new Cleavage({ title: cleavageTitle1, leftChoice: leftChoice.toDTO(), rightChoice: rightChoice.toDTO(), players: [player1().username] })),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, new Cleavage({ title: cleavageTitle1, leftChoice: leftChoice.toDTO(), rightChoice: rightChoice.toDTO(), players: [player1().username] }))
    ]),
    clientScenario(`Scenario 2 : Navigate to ${InterfaceView.CONNECT_CHAT} on chat gateway ${ChatStatus.DISCONNECTED}.`, [
        theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, InterfaceView.GAME),
        theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, ChatStatus.DISCONNECTED),
        whenEventOccurs(new LaunchCleavageEvent(cleavageTitle1, 'Gôche', 'Drouate')),
        theEventIsSent(Gherkin.THEN, new NavigateEvent(InterfaceView.CONNECT_CHAT)),
        theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, InterfaceView.GAME),
        theInterfaceGatewayDontHaveCleavage(Gherkin.AND_THEN)
    ]),
    clientScenario('Scenario 3 : Cleavage saved on global cleavage repository on launch', [
        theGlobalCleavageDrawPileGatewayDontHaveCleavages(Gherkin.GIVEN),
        theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, ChatStatus.CONNECTED),
        thePlayerRepositoryHasPlayers(Gherkin.AND_GIVEN, [player1(), player2()]),
        whenEventOccurs(new LaunchCleavageEvent(cleavageTitle1, 'Gôche', 'Drouate')),
        theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.THEN, new Cleavage({ title: cleavageTitle1, leftChoice: leftChoice.toDTO(), rightChoice: rightChoice.toDTO(), players: [] }))
    ]),
    clientScenario('Scenario 4 : Custom Cleavage.', [
        theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, InterfaceView.GAME),
        theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, ChatStatus.CONNECTED),
        thePlayerRepositoryHasPlayers(Gherkin.AND_GIVEN, [player1()]),
        theInterfaceGatewayDontHaveCleavage(Gherkin.AND_GIVEN),
        whenEventOccurs(new LaunchCleavageEvent(cleavageTitle1, 'yes', 'no')),
        theInterfaceGatewayHasCurrentView(Gherkin.THEN, InterfaceView.GAME),
        theEventIsSent(Gherkin.AND_THEN, new ChangeGamePhaseEvent(GamePhase.CLEAVING)),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'yes', players: [] }, rightChoice: { name: 'no', players: [] }, players: [player1().username] })),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'yes', players: [] }, rightChoice: { name: 'no', players: [] }, players: [player1().username] }))
    ])
])
