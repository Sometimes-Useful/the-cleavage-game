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
        theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.GIVEN, 5),
        theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, new Date()),
        theInterfaceGatewayHasAutoplayOptionEnabled(Gherkin.AND_GIVEN),
        whenEventOccurs(new StopAutoplayEvent()),
        theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.THEN, 0),
        theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.AND_THEN),
        theInterfaceGatewayHasAutoplayOptionDisabled(Gherkin.AND_THEN)
    ])
])
