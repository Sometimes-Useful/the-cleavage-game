import { theChatGatewayHasExpectedStatus, theCleavageRepositoryHasCurrentCleavage, theInterfaceCurrentCleavageTitleHasValue, theInterfaceGatewayHasCurrentView, whenEventOccurs } from '../../tests/unitTests'
import { feature, scenario } from '../../tests/testSuites'
import { Gherkin } from '../../tests/Gherkin'
import { InterfaceView } from '../../entities/InterfaceView'
import { ChatStatus } from '../../ports/ChatGateway'
import { LaunchCleavageEvent } from './LaunchCleavageEvent'
import { Cleavage } from '../../entities/Cleavage'
import { cleavageTitle } from '../../tests/testContexts'


feature(new LaunchCleavageEvent(cleavageTitle),[
    scenario(`Scenario 2 : UI updated to ${InterfaceView.CURRENT_CLEAVAGE} when chat gateway is ${ChatStatus.CONNECTED}.`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN,application.gateways.interface,InterfaceView.NEW_CLEAVAGE),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN,application.gateways.chat,ChatStatus.CONNECTED),
        application => whenEventOccurs(application.gateways.event, new LaunchCleavageEvent(cleavageTitle)),
        application => theInterfaceGatewayHasCurrentView(Gherkin.THEN,application.gateways.interface,InterfaceView.CURRENT_CLEAVAGE),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.AND_THEN,application.repositories.cleavage,new Cleavage(cleavageTitle)),
        application => theInterfaceCurrentCleavageTitleHasValue(Gherkin.AND_THEN,application.gateways.interface,cleavageTitle),
    ]),
    scenario(`Scenario 2 : UI updated to ${InterfaceView.CONNECT_CHAT} when chat gateway is ${ChatStatus.DISCONNECTED}.`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN,application.gateways.interface,InterfaceView.NEW_CLEAVAGE),
        application => theChatGatewayHasExpectedStatus(Gherkin.AND_GIVEN,application.gateways.chat,ChatStatus.DISCONNECTED),
        application => whenEventOccurs(application.gateways.event, new LaunchCleavageEvent(cleavageTitle)),
        application => theInterfaceGatewayHasCurrentView(Gherkin.THEN,application.gateways.interface,InterfaceView.CONNECT_CHAT),
        application => theInterfaceCurrentCleavageTitleHasValue(Gherkin.AND_THEN,application.gateways.interface,""),
    ])
])



