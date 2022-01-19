import { InterfaceView } from '../../entities/InterfaceView'
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../ports/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { feature, scenario } from '../../tests/testSuites'
import { theInterfaceGatewayHasCurrentView, theInterfaceGatewayHasPlayingSounds, whenEventOccurs } from '../../tests/unitTests'
import { EventType } from '../EventType'
import { NavigateEvent } from './NavigateEvent'

feature(EventType.NAVIGATE, [
    scenario(`Scenario 1 : ${new NavigateEvent(InterfaceView.MAIN_MENU)}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application.gateways.interface, InterfaceView.NEW_CLEAVAGE),
        application => whenEventOccurs(application.gateways.event, new NavigateEvent(InterfaceView.MAIN_MENU)),
        application => theInterfaceGatewayHasCurrentView(Gherkin.THEN, application.gateways.interface, InterfaceView.MAIN_MENU),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application.gateways.interface, new Sound(SupportedSound.POUFFF))
    ])
])
