import { feature, scenario } from '../../tests/testSuites'
import { Gherkin } from '../../tests/Gherkin'
import { InterfaceView } from '../../entities/InterfaceView'
import { ChatStatus } from '../../entities/ChatStatus'
import { LaunchCleavageEvent } from './LaunchCleavageEvent'
import { Cleavage } from '../../entities/Cleavage'
import { cleavageTitle1, player1 } from '../../tests/testContexts'
import { EventType } from '../EventType'
import { NavigateEvent } from '../navigateEvent/NavigateEvent'
import { theInterfaceGatewayDontHaveCleavage, theInterfaceGatewayHasCurrentCleavage, theInterfaceGatewayHasCurrentView } from '../../tests/unitTests/interfaceGateway'
import { theChatGatewayHasExpectedStatus } from '../../tests/unitTests/chatGateway'
import { theCurrentCleavageRepositoryHasCleavage, theGlobalCleavageDrawPileRepositoryDontHaveCleavages, theGlobalCleavageDrawPileRepositoryHasCleavages } from '../../tests/unitTests/cleavageRepository'

import { thePlayerRepositoryHasPlayers } from '../../tests/unitTests/playerRepository'
import { whenEventOccurs, theEventIsSent } from '../../tests/unitTests/eventGateway'
import type { Choice } from '../../entities/Choice'

const leftChoice:Choice = { name: 'Gôche', players: [] }
const rightChoice:Choice = { name: 'Drouate', players: [] }
feature(EventType.LAUNCH_CLEAVAGE, [
    scenario(`Scenario 1 : UI updated to ${InterfaceView.CURRENT_CLEAVAGE} when chat gateway is ${ChatStatus.CONNECTED}.`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.NEW_CLEAVAGE),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application, ChatStatus.CONNECTED),
        application => thePlayerRepositoryHasPlayers(Gherkin.AND_GIVEN, application, player1),
        application => theInterfaceGatewayDontHaveCleavage(Gherkin.AND_GIVEN, application),
        application => whenEventOccurs(application, new LaunchCleavageEvent(cleavageTitle1, 'Gôche', 'Drouate')),
        application => theInterfaceGatewayHasCurrentView(Gherkin.THEN, application, InterfaceView.NEW_CLEAVAGE),
        application => theEventIsSent(Gherkin.AND_THEN, application, new NavigateEvent(InterfaceView.CURRENT_CLEAVAGE)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, application, new Cleavage(cleavageTitle1, leftChoice, rightChoice, [player1])),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, new Cleavage(cleavageTitle1, leftChoice, rightChoice, [player1]))
    ]),
    scenario(`Scenario 2 : UI updated to ${InterfaceView.CONNECT_CHAT} when chat gateway is ${ChatStatus.DISCONNECTED}.`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.NEW_CLEAVAGE),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application, ChatStatus.DISCONNECTED),
        application => whenEventOccurs(application, new LaunchCleavageEvent(cleavageTitle1, 'Gôche', 'Drouate')),
        application => theEventIsSent(Gherkin.THEN, application, new NavigateEvent(InterfaceView.CONNECT_CHAT)),
        application => theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, application, InterfaceView.NEW_CLEAVAGE),
        application => theInterfaceGatewayDontHaveCleavage(Gherkin.AND_THEN, application)
    ]),
    scenario('Scenario 3 : Cleavage saved on global cleavage repository on launch', [
        application => theGlobalCleavageDrawPileRepositoryDontHaveCleavages(Gherkin.GIVEN, application),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application, ChatStatus.CONNECTED),
        application => whenEventOccurs(application, new LaunchCleavageEvent(cleavageTitle1, 'Gôche', 'Drouate')),
        application => theGlobalCleavageDrawPileRepositoryHasCleavages(Gherkin.THEN, application, new Cleavage(cleavageTitle1, leftChoice, rightChoice)),
        application => theEventIsSent(Gherkin.AND_THEN, application, new NavigateEvent(InterfaceView.CURRENT_CLEAVAGE))
    ]),
    scenario('Scenario 4 : Custom Cleavage.', [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.NEW_CLEAVAGE),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application, ChatStatus.CONNECTED),
        application => thePlayerRepositoryHasPlayers(Gherkin.AND_GIVEN, application, player1),
        application => theInterfaceGatewayDontHaveCleavage(Gherkin.AND_GIVEN, application),
        application => whenEventOccurs(application, new LaunchCleavageEvent(cleavageTitle1, 'yes', 'no')),
        application => theInterfaceGatewayHasCurrentView(Gherkin.THEN, application, InterfaceView.NEW_CLEAVAGE),
        application => theEventIsSent(Gherkin.AND_THEN, application, new NavigateEvent(InterfaceView.CURRENT_CLEAVAGE)),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, application, new Cleavage(cleavageTitle1, { name: 'yes', players: [] }, { name: 'no', players: [] }, [player1])),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, new Cleavage(cleavageTitle1, { name: 'yes', players: [] }, { name: 'no', players: [] }, [player1]))
    ])
])
