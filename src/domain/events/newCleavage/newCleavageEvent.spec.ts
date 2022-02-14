
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

feature(EventType.NEW_CLEAVAGE, [
    clientScenario(`Scenario 1 : UI updated to ${InterfaceView.CONNECT_CHAT} when chat gateway is ${ChatStatus.DISCONNECTED}.`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.NONE),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application, ChatStatus.DISCONNECTED),
        application => whenEventOccurs(application, new NewCleavageEvent()),
        application => theEventIsSent(Gherkin.THEN, application, new NavigateEvent(InterfaceView.CONNECT_CHAT)),
        application => theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, application, InterfaceView.NONE)
    ]),
    clientScenario(`Scenario 2 : UI updated to ${InterfaceView.NEW_CLEAVAGE} when chat gateway is ${ChatStatus.CONNECTED}.`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.NONE),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, application, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [] }, rightChoice: { name: 'Drouate', players: [] }, players: [] })),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application, ChatStatus.CONNECTED),
        application => whenEventOccurs(application, new NewCleavageEvent()),
        application => theEventIsSent(Gherkin.THEN, application, new NavigateEvent(InterfaceView.NEW_CLEAVAGE)),
        application => theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, application, InterfaceView.NONE),
        application => theInterfaceGatewayDontHaveCleavage(Gherkin.AND_THEN, application)
    ]),
    clientScenario('Scenario 3 : on autoplay enabled.', [
        application => theChatGatewayHasExpectedStatus(Gherkin.GIVEN, application, ChatStatus.CONNECTED),
        application => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, application, new Date()),
        application => whenEventOccurs(application, new NewCleavageEvent()),
        application => theEventIsSent(Gherkin.THEN, application, [
            new NavigateEvent(InterfaceView.NEW_CLEAVAGE),
            new DrawCleavageEvent()
        ])
    ]),
    clientScenario('Scenario 4 : on autoplay disabled.', [
        application => theChatGatewayHasExpectedStatus(Gherkin.GIVEN, application, ChatStatus.CONNECTED),
        application => theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.AND_GIVEN, application),
        application => whenEventOccurs(application, new NewCleavageEvent()),
        application => theEventIsSent(Gherkin.THEN, application, new NavigateEvent(InterfaceView.NEW_CLEAVAGE))
    ])
])
