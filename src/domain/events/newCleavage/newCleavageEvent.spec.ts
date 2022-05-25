
import { ChatStatus } from '../../entities/ChatStatus'
import { Cleavage } from '../../entities/Cleavage'
import { GamePhase } from '../../entities/GamePhase'
import { InterfaceView } from '../../entities/InterfaceView'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { cleavageTitle1 } from '../../tests/testContexts'
import { theAutoPlayRepositoryDontHaveNextCleavageDate, theAutoPlayRepositoryHasNextCleavageDate } from '../../tests/unitTests/autoplayRepository'
import { theChatGatewayHasExpectedStatus } from '../../tests/unitTests/chatGateway'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theGamePhaseRepositoryHasPhase } from '../../tests/unitTests/gamePhaseRepository'
import { theInterfaceGatewayDontHaveCleavage, theInterfaceGatewayHasCurrentCleavage, theInterfaceGatewayHasCurrentView } from '../../tests/unitTests/interfaceGateway'
import { ChangeGamePhaseEvent } from '../changeGamePhase/ChangeGamePhaseEvent'
import { EventType } from '../EventType'
import { NavigateEvent } from '../navigateEvent/NavigateEvent'
import { VideoExtractStartEvent } from '../videoExtractStart/VideoExtractStartEvent'
import { NewCleavageEvent } from './NewCleavageEvent'

feature(EventType.NEW_CLEAVAGE, [
    clientScenario(`Scenario 1 : Navigate to ${InterfaceView.CONNECT_CHAT} when chat gateway is ${ChatStatus.DISCONNECTED}.`, [
        theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, InterfaceView.GAME),
        theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, ChatStatus.DISCONNECTED),
        whenEventOccurs(new NewCleavageEvent()),
        theEventIsSent(Gherkin.THEN, new NavigateEvent(InterfaceView.CONNECT_CHAT)),
        theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, InterfaceView.GAME)
    ]),
    clientScenario(`Scenario 2 : Change game phase to ${GamePhase.NEW_CLEAVAGE} when chat gateway is ${ChatStatus.CONNECTED}.`, [
        theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, InterfaceView.GAME),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [] }, rightChoice: { name: 'Drouate', players: [] }, players: [] })),
        theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, ChatStatus.CONNECTED),
        whenEventOccurs(new NewCleavageEvent()),
        theEventIsSent(Gherkin.THEN, new VideoExtractStartEvent()),
        theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, InterfaceView.GAME),
        theInterfaceGatewayDontHaveCleavage(Gherkin.AND_THEN)
    ]),
    clientScenario('Scenario 3 : on autoplay enabled.', [
        theChatGatewayHasExpectedStatus(Gherkin.GIVEN, ChatStatus.CONNECTED),
        theInterfaceGatewayHasCurrentView(Gherkin.AND_GIVEN, InterfaceView.GAME),
        theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, new Date()),
        whenEventOccurs(new NewCleavageEvent()),
        theEventIsSent(Gherkin.THEN, new VideoExtractStartEvent())
    ]),
    clientScenario('Scenario 4 : on autoplay disabled.', [
        theChatGatewayHasExpectedStatus(Gherkin.GIVEN, ChatStatus.CONNECTED),
        theInterfaceGatewayHasCurrentView(Gherkin.AND_GIVEN, InterfaceView.GAME),
        theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.AND_GIVEN),
        whenEventOccurs(new NewCleavageEvent()),
        theEventIsSent(Gherkin.THEN, new VideoExtractStartEvent())
    ]),
    clientScenario('Scenario 5 : BUG no view change when main menu', [
        theChatGatewayHasExpectedStatus(Gherkin.GIVEN, ChatStatus.CONNECTED),
        theInterfaceGatewayHasCurrentView(Gherkin.AND_GIVEN, InterfaceView.MAIN_MENU),
        whenEventOccurs(new NewCleavageEvent()),
        theEventIsSent(Gherkin.THEN, [
            new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE),
            new NavigateEvent(InterfaceView.GAME)
        ]),
        theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, InterfaceView.MAIN_MENU)
    ]),
    clientScenario(`Scenario 6 : No game phase change event to ${GamePhase.NEW_CLEAVAGE} when still ${GamePhase.NEW_CLEAVAGE}`, [
        theChatGatewayHasExpectedStatus(Gherkin.GIVEN, ChatStatus.CONNECTED),
        theInterfaceGatewayHasCurrentView(Gherkin.AND_GIVEN, InterfaceView.MAIN_MENU),
        theGamePhaseRepositoryHasPhase(Gherkin.AND_GIVEN, GamePhase.NEW_CLEAVAGE),
        whenEventOccurs(new NewCleavageEvent()),
        theEventIsSent(Gherkin.THEN, [
            new NavigateEvent(InterfaceView.GAME)
        ]),
        theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, InterfaceView.MAIN_MENU)
    ])
])
