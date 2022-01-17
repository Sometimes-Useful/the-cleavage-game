import { Gherkin } from '../../tests/Gherkin'
import { whenEventOccurs, theEventIsSent } from '../../tests/unitTests'
import { feature, scenario } from '../../tests/testSuites'
import { ApplicationStartEvent } from './ApplicationStartEvent'
import { InterfaceView } from '../../entities/InterfaceView'
import { EventType } from '../EventType'
import { NavigateEvent } from '../navigateEvent/NavigateEvent'

feature(EventType.APPLICATION_START, [
    scenario('Scenario 1 : Main menu on application start.', [
        application => whenEventOccurs(application.gateways.event, new ApplicationStartEvent()),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event, new NavigateEvent(InterfaceView.MAIN_MENU))
    ])
])
