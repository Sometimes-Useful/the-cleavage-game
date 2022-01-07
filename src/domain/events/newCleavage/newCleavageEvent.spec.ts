import { theChatGatewayHasExpectedStatus, theInterfaceGatewayHasCurrentView, whenEventOccurs } from '../../tests/unitTests'
import { feature, scenario } from '../../tests/testSuites'
import { Gherkin } from '../../tests/Gherkin'
import { InterfaceView } from '../../entities/InterfaceView'
import { NewCleavageEvent } from './NewCleavageEvent'
import { ChatStatus } from '../../entities/ChatStatus'

feature(new NewCleavageEvent(), [
    scenario(`Scenario 1 : UI updated to ${InterfaceView.CONNECT_CHAT} when chat gateway is ${ChatStatus.DISCONNECTED}.`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.NONE),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application.gateways.chat, ChatStatus.DISCONNECTED),
        application => whenEventOccurs(application.gateways.event, new NewCleavageEvent()),
        application => theInterfaceGatewayHasCurrentView(Gherkin.THEN, application.gateways.interface, InterfaceView.CONNECT_CHAT)
    ]),
    scenario(`Scenario 2 : UI updated to ${InterfaceView.NEW_CLEAVAGE} when chat gateway is ${ChatStatus.CONNECTED}.`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.NONE),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN, application.gateways.chat, ChatStatus.CONNECTED),
        application => whenEventOccurs(application.gateways.event, new NewCleavageEvent()),
        application => theInterfaceGatewayHasCurrentView(Gherkin.THEN, application.gateways.interface, InterfaceView.NEW_CLEAVAGE)
    ])
])
