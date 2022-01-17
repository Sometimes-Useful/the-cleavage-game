import { theChatGatewayHasExpectedStatus, theCleavageRepositoryHasCurrentCleavage, theEventIsSent, theInterfaceGatewayDontHaveCleavage, theInterfaceGatewayHasCurrentCleavage, theInterfaceGatewayHasCurrentView, whenEventOccurs } from '../../tests/unitTests'
import { feature, scenario } from '../../tests/testSuites'
import { Gherkin } from '../../tests/Gherkin'
import { InterfaceView } from '../../entities/InterfaceView'
import { ChatStatus } from '../../entities/ChatStatus'
import { LaunchCleavageEvent } from './LaunchCleavageEvent'
import { Cleavage } from '../../entities/Cleavage'
import { cleavageTitle1 } from '../../tests/testContexts'
import { EventType } from '../EventType'
import { NavigateEvent } from '../navigateEvent/NavigateEvent'

feature(EventType.LAUNCH_CLEAVAGE, [
    scenario(`Scenario 2 : UI updated to ${InterfaceView.CURRENT_CLEAVAGE} when chat gateway is ${ChatStatus.CONNECTED}.`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.NEW_CLEAVAGE),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application.gateways.chat, ChatStatus.CONNECTED),
        application => whenEventOccurs(application.gateways.event, new LaunchCleavageEvent(cleavageTitle1)),
        application => theInterfaceGatewayHasCurrentView(Gherkin.THEN, application.gateways.interface, InterfaceView.NEW_CLEAVAGE),
        application => theEventIsSent(Gherkin.AND_THEN, application.gateways.event, new NavigateEvent(InterfaceView.CURRENT_CLEAVAGE)),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.AND_THEN, application.repositories.cleavage, new Cleavage(cleavageTitle1)),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application.gateways.interface, new Cleavage(cleavageTitle1))
    ]),
    scenario(`Scenario 2 : UI updated to ${InterfaceView.CONNECT_CHAT} when chat gateway is ${ChatStatus.DISCONNECTED}.`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.NEW_CLEAVAGE),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application.gateways.chat, ChatStatus.DISCONNECTED),
        application => whenEventOccurs(application.gateways.event, new LaunchCleavageEvent(cleavageTitle1)),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event, new NavigateEvent(InterfaceView.CONNECT_CHAT)),
        application => theInterfaceGatewayHasCurrentView(Gherkin.AND_THEN, application.gateways.interface, InterfaceView.NEW_CLEAVAGE),
        application => theInterfaceGatewayDontHaveCleavage(Gherkin.AND_THEN, application.gateways.interface)
    ])
])
