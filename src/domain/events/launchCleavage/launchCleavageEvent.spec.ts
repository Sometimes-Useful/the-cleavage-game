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

const leftChoice:Choice = new Choice({ name: 'Gôche', players: [] })
const rightChoice:Choice = new Choice({ name: 'Drouate', players: [] })
feature(EventType.LAUNCH_CLEAVAGE, [
    clientScenario(`Scenario 1 : UI updated to ${InterfaceView.CURRENT_CLEAVAGE} when chat gateway is ${ChatStatus.CONNECTED}.`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.NEW_CLEAVAGE),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application, ChatStatus.CONNECTED),
        application => thePlayerRepositoryHasPlayers(Gherkin.AND_GIVEN, application, player1),
        application => theInterfaceGatewayDontHaveCleavage(Gherkin.AND_GIVEN, application),
        application => whenEventOccurs(application, new LaunchCleavageEvent(cleavageTitle1, 'Gôche', 'Drouate')),
        application => theInterfaceGatewayHasCurrentView(Gherkin.THEN, application, InterfaceView.NEW_CLEAVAGE),
        application => theEventIsSent(Gherkin.AND_THEN, application, new NavigateEvent(InterfaceView.CURRENT_CLEAVAGE)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, application, new Cleavage({ title: cleavageTitle1, leftChoice: leftChoice.toDTO(), rightChoice: rightChoice.toDTO(), players: [player1] })),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, new Cleavage({ title: cleavageTitle1, leftChoice: leftChoice.toDTO(), rightChoice: rightChoice.toDTO(), players: [player1] }))
    ]),
    clientScenario(`Scenario 2 : UI updated to ${InterfaceView.CONNECT_CHAT} when chat gateway is ${ChatStatus.DISCONNECTED}.`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.NEW_CLEAVAGE),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application, ChatStatus.DISCONNECTED),
        application => whenEventOccurs(application, new LaunchCleavageEvent(cleavageTitle1, 'Gôche', 'Drouate')),
        application => theEventIsSent(Gherkin.THEN, application, new NavigateEvent(InterfaceView.CONNECT_CHAT)),
        application => theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, application, InterfaceView.NEW_CLEAVAGE),
        application => theInterfaceGatewayDontHaveCleavage(Gherkin.AND_THEN, application)
    ]),
    clientScenario('Scenario 3 : Cleavage saved on global cleavage repository on launch', [
        application => theGlobalCleavageDrawPileGatewayDontHaveCleavages(Gherkin.GIVEN, application),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application, ChatStatus.CONNECTED),
        application => thePlayerRepositoryHasPlayers(Gherkin.AND_GIVEN, application, [player1, player2]),
        application => whenEventOccurs(application, new LaunchCleavageEvent(cleavageTitle1, 'Gôche', 'Drouate')),
        application => theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.THEN, application, new Cleavage({ title: cleavageTitle1, leftChoice: leftChoice.toDTO(), rightChoice: rightChoice.toDTO(), players: [] })),
        application => theEventIsSent(Gherkin.AND_THEN, application, new NavigateEvent(InterfaceView.CURRENT_CLEAVAGE))
    ]),
    clientScenario('Scenario 4 : Custom Cleavage.', [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.NEW_CLEAVAGE),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application, ChatStatus.CONNECTED),
        application => thePlayerRepositoryHasPlayers(Gherkin.AND_GIVEN, application, player1),
        application => theInterfaceGatewayDontHaveCleavage(Gherkin.AND_GIVEN, application),
        application => whenEventOccurs(application, new LaunchCleavageEvent(cleavageTitle1, 'yes', 'no')),
        application => theInterfaceGatewayHasCurrentView(Gherkin.THEN, application, InterfaceView.NEW_CLEAVAGE),
        application => theEventIsSent(Gherkin.AND_THEN, application, new NavigateEvent(InterfaceView.CURRENT_CLEAVAGE)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, application, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'yes', players: [] }, rightChoice: { name: 'no', players: [] }, players: [player1] })),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'yes', players: [] }, rightChoice: { name: 'no', players: [] }, players: [player1] }))
    ])
])
