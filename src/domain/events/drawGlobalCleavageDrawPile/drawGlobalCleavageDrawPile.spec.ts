import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { serverScenario } from '../../tests/serverScenario'
import { commonCleavage1, commonCleavage2 } from '../../tests/testContexts'
import { whenQueryOccursThenHasResult } from '../../tests/unitTests/eventGateway'
import { EventType } from '../EventType'
import { theGlobalCleavageDrawPileRepositoryHasCleavage } from '../../tests/unitTests/globalCleavageDrawPileRepository'

feature(EventType.DRAW_GLOBAL_CLEAVAGE_DRAWPILE, [
    serverScenario('Scenario 1 : With on cleavage on draw pile', [
        application => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.GIVEN, application, commonCleavage1()),
        application => whenQueryOccursThenHasResult(application, commonCleavage1()),
        application => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.AND_THEN, application, commonCleavage1())
    ]),
    serverScenario('Scenario 2 : With 2 cleavages on draw pile', [
        application => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.GIVEN, application, [commonCleavage1(), commonCleavage2()]),
        application => whenQueryOccursThenHasResult(application, commonCleavage1()),
        application => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.AND_THEN, application, [commonCleavage1(), commonCleavage2()])
    ]),
    serverScenario('Scenario 3 : With 0 cleavages on draw pile', [
        application => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.GIVEN, application, []),
        application => whenQueryOccursThenHasResult(application, undefined),
        application => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.AND_THEN, application, [])
    ])
])
