
import { theChatGatewayHasExpectedStatus } from '../../tests/unitTests/chatGateway'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { InterfaceView } from '../../entities/InterfaceView'
import { NewCleavageEvent } from './NewCleavageEvent'
import { ChatStatus } from '../../entities/ChatStatus'
import { Cleavage } from '../../entities/Cleavage'
import { cleavageTitle1 } from '../../tests/testContexts'
import { EventType } from '../EventType'
import { NavigateEvent } from '../navigateEvent/NavigateEvent'
import { theInterfaceGatewayDontHaveCleavage, theInterfaceGatewayHasCurrentCleavage, theInterfaceGatewayHasCurrentView } from '../../tests/unitTests/interfaceGateway'
import { whenEventOccurs, theEventIsSent } from '../../tests/unitTests/eventGateway'
import { DrawCleavageEvent } from '../drawCleavage/DrawCleavageEvent'
import { theAutoPlayRepositoryDontHaveNextCleavageDate, theAutoPlayRepositoryHasNextCleavageDate } from '../../tests/unitTests/autoplayRepository'
import { ChangeGamePhaseEvent } from '../changeGamePhase/ChangeGamePhaseEvent'
import { GamePhase } from '../../entities/GamePhase'

feature(EventType.NEW_CLEAVAGE, [
    clientScenario(`Scenario 1 : Navigate to ${InterfaceView.CONNECT_CHAT} when chat gateway is ${ChatStatus.DISCONNECTED}.`, [
        app => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, app, InterfaceView.GAME),
        app => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, app, ChatStatus.DISCONNECTED),
        app => whenEventOccurs(app, new NewCleavageEvent()),
        app => theEventIsSent(Gherkin.THEN, app, new NavigateEvent(InterfaceView.CONNECT_CHAT)),
        app => theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, app, InterfaceView.GAME)
    ]),
    clientScenario(`Scenario 2 : Change game phase to ${GamePhase.NEW_CLEAVAGE} when chat gateway is ${ChatStatus.CONNECTED}.`, [
        app => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, app, InterfaceView.GAME),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, app, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [] }, rightChoice: { name: 'Drouate', players: [] }, players: [] })),
        app => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, app, ChatStatus.CONNECTED),
        app => whenEventOccurs(app, new NewCleavageEvent()),
        app => theEventIsSent(Gherkin.THEN, app, new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE)),
        app => theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, app, InterfaceView.GAME),
        app => theInterfaceGatewayDontHaveCleavage(Gherkin.AND_THEN, app)
    ]),
    clientScenario('Scenario 3 : on autoplay enabled.', [
        app => theChatGatewayHasExpectedStatus(Gherkin.GIVEN, app, ChatStatus.CONNECTED),
        app => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, app, new Date()),
        app => whenEventOccurs(app, new NewCleavageEvent()),
        app => theEventIsSent(Gherkin.THEN, app, [
            new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE),
            new DrawCleavageEvent()
        ])
    ]),
    clientScenario('Scenario 4 : on autoplay disabled.', [
        app => theChatGatewayHasExpectedStatus(Gherkin.GIVEN, app, ChatStatus.CONNECTED),
        app => theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.AND_GIVEN, app),
        app => whenEventOccurs(app, new NewCleavageEvent()),
        app => theEventIsSent(Gherkin.THEN, app, new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE))
    ])
])
