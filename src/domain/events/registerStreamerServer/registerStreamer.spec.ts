import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { serverScenario } from '../../tests/serverScenario'
import { streamer1 } from '../../tests/testContexts'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'

import { theStreamersRepositoryDontHaveRegisteredStreamers, theStreamersRepositoryHasStreamers } from '../../tests/unitTests/streamersRepository'
import { EventType } from '../EventType'
import { RegisterStreamerServerEvent } from './RegisterStreamerServerEvent'

feature(EventType.REGISTER_STREAMER_BACKEND, [
    serverScenario('Scenario 1 : Streamer not already register.', [
        theStreamersRepositoryDontHaveRegisteredStreamers(Gherkin.GIVEN),
        whenEventOccurs(new RegisterStreamerServerEvent(streamer1)),
        theStreamersRepositoryHasStreamers(Gherkin.THEN, streamer1)
    ]),
    serverScenario('Scenario 2 : Streamer already registered.', [
        theStreamersRepositoryHasStreamers(Gherkin.GIVEN, streamer1),
        whenEventOccurs(new RegisterStreamerServerEvent(streamer1)),
        theStreamersRepositoryHasStreamers(Gherkin.THEN, streamer1)
    ])
])
