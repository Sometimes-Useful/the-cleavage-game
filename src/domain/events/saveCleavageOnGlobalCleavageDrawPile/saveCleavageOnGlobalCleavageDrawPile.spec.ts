import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { serverScenario } from '../../tests/serverScenario'
import { commonCleavage1, commonCleavage2 } from '../../tests/testContexts'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theGlobalCleavageDrawPileRepositoryHasCleavage } from '../../tests/unitTests/globalCleavageDrawPileRepository'
import { EventType } from '../EventType'
import { SaveCleavageOnGlobalCleavageDrawPileEvent } from './SaveCleavageOnGlobalCleavageDrawPileEvent'

feature(EventType.SAVE_CLEAVAGE_ON_GLOBAL_CLEAVAGE_DRAWPILE, [
    serverScenario('Scenario 1 : With no cleavage on draw pile', [
        theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.GIVEN, []),
        whenEventOccurs(new SaveCleavageOnGlobalCleavageDrawPileEvent(commonCleavage1())),
        theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.AND_THEN, [commonCleavage1()])
    ]),
    serverScenario('Scenario 2 : With existing same cleavage on draw pile', [
        theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.GIVEN, [commonCleavage1()]),
        whenEventOccurs(new SaveCleavageOnGlobalCleavageDrawPileEvent(commonCleavage1())),
        theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.AND_THEN, [commonCleavage1()])
    ]),
    serverScenario('Scenario 3 : With existing same cleavage on draw pile', [
        theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.GIVEN, [commonCleavage1()]),
        whenEventOccurs(new SaveCleavageOnGlobalCleavageDrawPileEvent(commonCleavage2())),
        theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.AND_THEN, [commonCleavage1(), commonCleavage2()])
    ])
])
