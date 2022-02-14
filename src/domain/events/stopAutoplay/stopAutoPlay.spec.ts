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
        application => theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.GIVEN, application, 5),
        application => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, application, new Date()),
        application => theInterfaceGatewayHasAutoplayOptionEnabled(Gherkin.AND_GIVEN, application),
        application => whenEventOccurs(application, new StopAutoplayEvent()),
        application => theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.THEN, application, 0),
        application => theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.AND_THEN, application),
        application => theInterfaceGatewayHasAutoplayOptionDisabled(Gherkin.AND_THEN, application)
    ])
])
