import { theChatGatewayHasExpectedStatus, theEventIsSent, theInterfaceGatewayDontHaveCleavage, theInterfaceGatewayHasCurrentCleavage, theInterfaceGatewayHasCurrentView, whenEventOccurs } from '../../tests/unitTests'
import { feature, scenario } from '../../tests/testSuites'
import { Gherkin } from '../../tests/Gherkin'
import { InterfaceView } from '../../entities/InterfaceView'
import { NewCleavageEvent } from './NewCleavageEvent'
import { ChatStatus } from '../../entities/ChatStatus'
import { Cleavage } from '../../entities/Cleavage'
import { cleavageTitle1 } from '../../tests/testContexts'
import { EventType } from '../EventType'
import { NavigateEvent } from '../navigateEvent/NavigateEvent'

feature(EventType.NEW_CLEAVAGE, [
    scenario(`Scenario 1 : UI updated to ${InterfaceView.CONNECT_CHAT} when chat gateway is ${ChatStatus.DISCONNECTED}.`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.NONE),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application.gateways.chat, ChatStatus.DISCONNECTED),
        application => whenEventOccurs(application.gateways.event, new NewCleavageEvent()),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event, new NavigateEvent(InterfaceView.CONNECT_CHAT)),
        application => theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, application.gateways.interface, InterfaceView.NONE)
    ]),
    scenario(`Scenario 2 : UI updated to ${InterfaceView.NEW_CLEAVAGE} when chat gateway is ${ChatStatus.CONNECTED}.`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.NONE),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, application.gateways.interface, new Cleavage(cleavageTitle1)),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application.gateways.chat, ChatStatus.CONNECTED),
        application => whenEventOccurs(application.gateways.event, new NewCleavageEvent()),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event, new NavigateEvent(InterfaceView.NEW_CLEAVAGE)),
        application => theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, application.gateways.interface, InterfaceView.NONE),
        application => theInterfaceGatewayDontHaveCleavage(Gherkin.AND_THEN, application.gateways.interface)
    ])
])
