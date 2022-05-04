import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { serverScenario } from '../../tests/serverScenario'
import { streamer1, streamer2 } from '../../tests/testContexts'
import { whenRetreiveStreamersOccursThenHasResult } from '../../tests/unitTests/eventGateway'
import { theStreamersRepositoryDontHaveRegisteredStreamers, theStreamersRepositoryHasStreamers } from '../../tests/unitTests/streamersRepository'
import { EventType } from '../EventType'

feature(EventType.RETRIEVE_STREAMERS, [
    serverScenario('Scenario 1 : streamer exist.', [
        theStreamersRepositoryHasStreamers(Gherkin.GIVEN, [streamer1, streamer2]),
        whenRetreiveStreamersOccursThenHasResult([streamer1, streamer2])
    ]),
    serverScenario('Scenario 2 : streamer doesn\'t exist.', [
        theStreamersRepositoryDontHaveRegisteredStreamers(Gherkin.GIVEN),
        whenRetreiveStreamersOccursThenHasResult([])
    ])
])
