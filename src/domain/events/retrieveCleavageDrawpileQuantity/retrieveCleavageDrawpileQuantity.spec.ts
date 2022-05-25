import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { serverScenario } from '../../tests/serverScenario'
import { commonCleavage1, commonCleavage2 } from '../../tests/testContexts'
import { whenQueryRetrieveCleavageDrawPileQuantityOccursThenHasResult } from '../../tests/unitTests/eventGateway'
import { theGlobalCleavageDrawPileRepositoryHasCleavage } from '../../tests/unitTests/globalCleavageDrawPileRepository'
import { EventType } from '../EventType'

feature(EventType.RETRIEVE_CLEAVAGE_DRAWPILE_QUANTITY, [
    serverScenario('Scenario 1 : With on cleavage on draw pile', [
        theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.GIVEN, commonCleavage1()),
        whenQueryRetrieveCleavageDrawPileQuantityOccursThenHasResult(1)
    ]),
    serverScenario('Scenario 2 : With 2 cleavages on draw pile', [
        theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.GIVEN, [commonCleavage1(), commonCleavage2()]),
        whenQueryRetrieveCleavageDrawPileQuantityOccursThenHasResult(2)
    ]),
    serverScenario('Scenario 3 : With 0 cleavages on draw pile', [
        theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.GIVEN, []),
        whenQueryRetrieveCleavageDrawPileQuantityOccursThenHasResult(0)
    ])
])
