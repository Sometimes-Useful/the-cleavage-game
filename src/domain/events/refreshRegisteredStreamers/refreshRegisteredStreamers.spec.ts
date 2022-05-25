import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { streamer1, streamer2 } from '../../tests/testContexts'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayDontHaveRegisteredStreamers, theInterfaceGatewayHasRegisteredStreamers } from '../../tests/unitTests/interfaceGateway'
import { theStreamersGatewayHasStreamers } from '../../tests/unitTests/streamersGateway'
import { EventType } from '../EventType'
import { RefreshRegisteredStreamersEvent } from './RefreshRegisteredStreamers'

feature(EventType.REFRESH_REGISTERED_STREAMERS, [
    clientScenario('Scenario 1: With registered streamers.', [
        theStreamersGatewayHasStreamers(Gherkin.GIVEN, [streamer1, streamer2]),
        theInterfaceGatewayDontHaveRegisteredStreamers(Gherkin.AND_GIVEN),
        whenEventOccurs(new RefreshRegisteredStreamersEvent()),
        theInterfaceGatewayHasRegisteredStreamers(Gherkin.THEN, [streamer1, streamer2])
    ]),
    clientScenario('Scenario 2: Streamer already registered.', [
        theStreamersGatewayHasStreamers(Gherkin.GIVEN, []),
        theInterfaceGatewayDontHaveRegisteredStreamers(Gherkin.AND_GIVEN),
        whenEventOccurs(new RefreshRegisteredStreamersEvent()),
        theInterfaceGatewayDontHaveRegisteredStreamers(Gherkin.THEN)
    ])
])
