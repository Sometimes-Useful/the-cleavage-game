import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { serverScenario } from '../../tests/serverScenario'
import { streamer1 } from '../../tests/testContexts'
import { whenRetreiveStreamerOccursThenHasResult } from '../../tests/unitTests/eventGateway'
import { theStreamersRepositoryDontHaveRegisteredStreamers, theStreamersRepositoryHasStreamers } from '../../tests/unitTests/streamersRepository'
import { EventType } from '../EventType'

feature(EventType.RETRIEVE_STREAMER, [
    serverScenario('Scenario 1 : streamer exist.', [
        theStreamersRepositoryHasStreamers(Gherkin.GIVEN, [streamer1]),
        whenRetreiveStreamerOccursThenHasResult(streamer1.username, streamer1)
    ]),
    serverScenario('Scenario 2 : streamer doesn\'t exist.', [
        theStreamersRepositoryDontHaveRegisteredStreamers(Gherkin.GIVEN),
        whenRetreiveStreamerOccursThenHasResult(streamer1.username, undefined)
    ])
])
