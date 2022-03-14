import { Gherkin } from '../../tests/Gherkin'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { theAutoPlayRepositoryDontHaveNextCleavageDate, theAutoPlayRepositoryHasAutoPlayInterval, theAutoPlayRepositoryHasNextCleavageDate } from '../../tests/unitTests/autoplayRepository'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayHasAutoplayOptionDisabled, theInterfaceGatewayHasAutoplayOptionEnabled } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { StopAutoplayEvent } from './StopAutoplayEvent'

feature(EventType.STOP_AUTOPLAY, [
    clientScenario('Scenario 1 : Stop autoplay', [
        app => theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.GIVEN, app, 5),
        app => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, app, new Date()),
        app => theInterfaceGatewayHasAutoplayOptionEnabled(Gherkin.AND_GIVEN, app),
        app => whenEventOccurs(app, new StopAutoplayEvent()),
        app => theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.THEN, app, 0),
        app => theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.AND_THEN, app),
        app => theInterfaceGatewayHasAutoplayOptionDisabled(Gherkin.AND_THEN, app)
    ])
])
