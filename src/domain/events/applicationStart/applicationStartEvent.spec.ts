import { Gherkin } from '../../tests/Gherkin'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { ApplicationStartEvent } from './ApplicationStartEvent'
import { InterfaceView } from '../../entities/InterfaceView'
import { EventType } from '../EventType'
import { NavigateEvent } from '../navigateEvent/NavigateEvent'
import { whenEventOccurs, theEventIsSent } from '../../tests/unitTests/eventGateway'

feature(EventType.APPLICATION_START, [
    clientScenario('Scenario 1 : Main menu on application start.', [
        whenEventOccurs(new ApplicationStartEvent()),
        theEventIsSent(Gherkin.THEN, new NavigateEvent(InterfaceView.MAIN_MENU))
    ])
])
