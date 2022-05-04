import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { streamer1 } from '../../tests/testContexts'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theStreamersGatewayDontHaveStreamers, theStreamersGatewayHasStreamers } from '../../tests/unitTests/streamersGateway'
import { EventType } from '../EventType'
import { RegisterStreamerEvent } from './RegisterStreamerEvent'

feature(EventType.REGISTER_STREAMER, [
    clientScenario('Scenario 1: Streamer not registered.', [
        theStreamersGatewayDontHaveStreamers(Gherkin.GIVEN),
        whenEventOccurs(new RegisterStreamerEvent(streamer1.username)),
        theStreamersGatewayHasStreamers(Gherkin.THEN, streamer1)
    ]),
    clientScenario('Scenario 2: Streamer already registered.', [
        theStreamersGatewayHasStreamers(Gherkin.GIVEN, streamer1),
        whenEventOccurs(new RegisterStreamerEvent(streamer1.username)),
        theStreamersGatewayHasStreamers(Gherkin.THEN, streamer1)
    ])
])
