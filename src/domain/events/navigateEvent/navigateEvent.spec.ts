import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { EventType } from '../EventType'
import { NavigateEvent } from './NavigateEvent'
import { theInterfaceGatewayHasCurrentView, theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { InterfaceView } from '../../entities/InterfaceView'
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'
import { Gherkin } from '../../tests/Gherkin'

feature(EventType.NAVIGATE, [
    clientScenario(`Scenario 1 : ${JSON.stringify(new NavigateEvent(InterfaceView.MAIN_MENU))}`, [
        application => theInterfaceGatewayHasCurrentView(Gherkin.GIVEN, application, InterfaceView.NEW_CLEAVAGE),
        application => whenEventOccurs(application, new NavigateEvent(InterfaceView.MAIN_MENU)),
        application => theInterfaceGatewayHasCurrentView(Gherkin.THEN, application, InterfaceView.MAIN_MENU),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application, new Sound(SupportedSound.POUFFF))
    ])
])
