import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { streamer1 } from '../../tests/testContexts'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayHasStreamerRegistered, theInterfaceGatewayDontHaveStreamerRegistered } from '../../tests/unitTests/interfaceGateway'
import { theStreamersGatewayDontHaveStreamers, theStreamersGatewayHasStreamers } from '../../tests/unitTests/streamersGateway'
import { EventType } from '../EventType'
import { CheckRegisteredStreamerEvent } from './CheckRegisteredStreamerEvent'

feature(EventType.CHECK_REGISTERED_STREAMER, [
    clientScenario('Scenario 1 : Streamer Registered.', [
        theStreamersGatewayHasStreamers(Gherkin.GIVEN, streamer1),
        whenEventOccurs(new CheckRegisteredStreamerEvent(streamer1.username)),
        theInterfaceGatewayHasStreamerRegistered(Gherkin.THEN)
    ]),
    clientScenario('Scenario 2 : Streamer not registered.', [
        theStreamersGatewayDontHaveStreamers(Gherkin.GIVEN),
        whenEventOccurs(new CheckRegisteredStreamerEvent(streamer1.username)),
        theInterfaceGatewayDontHaveStreamerRegistered(Gherkin.THEN)
    ])
])
