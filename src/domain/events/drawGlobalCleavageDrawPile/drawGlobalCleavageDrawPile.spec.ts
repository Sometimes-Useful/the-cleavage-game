import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { serverScenario } from '../../tests/serverScenario'
import { commonCleavage1, commonCleavage2 } from '../../tests/testContexts'
import { whenQueryOccursThenHasResult } from '../../tests/unitTests/eventGateway'
import { EventType } from '../EventType'
import { theGlobalCleavageDrawPileRepositoryHasCleavage } from '../../tests/unitTests/globalCleavageDrawPileRepository'

feature(EventType.DRAW_GLOBAL_CLEAVAGE_DRAWPILE, [
    serverScenario('Scenario 1 : With on cleavage on draw pile', [
        app => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.GIVEN, app, commonCleavage1()),
        app => whenQueryOccursThenHasResult(app, commonCleavage1()),
        app => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.AND_THEN, app, commonCleavage1())
    ]),
    serverScenario('Scenario 2 : With 2 cleavages on draw pile', [
        app => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.GIVEN, app, [commonCleavage1(), commonCleavage2()]),
        app => whenQueryOccursThenHasResult(app, commonCleavage1()),
        app => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.AND_THEN, app, [commonCleavage1(), commonCleavage2()])
    ]),
    serverScenario('Scenario 3 : With 0 cleavages on draw pile', [
        app => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.GIVEN, app, []),
        app => whenQueryOccursThenHasResult(app, undefined),
        app => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.AND_THEN, app, [])
    ])
])
