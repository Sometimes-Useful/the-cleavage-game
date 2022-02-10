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
        application => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.GIVEN, application, []),
        application => whenEventOccurs(application, new SaveCleavageOnGlobalCleavageDrawPileEvent(commonCleavage1())),
        application => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.AND_THEN, application, [commonCleavage1()])
    ]),
    serverScenario('Scenario 2 : With existing same cleavage on draw pile', [
        application => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.GIVEN, application, [commonCleavage1()]),
        application => whenEventOccurs(application, new SaveCleavageOnGlobalCleavageDrawPileEvent(commonCleavage1())),
        application => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.AND_THEN, application, [commonCleavage1()])
    ]),
    serverScenario('Scenario 3 : With existing same cleavage on draw pile', [
        application => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.GIVEN, application, [commonCleavage1()]),
        application => whenEventOccurs(application, new SaveCleavageOnGlobalCleavageDrawPileEvent(commonCleavage2())),
        application => theGlobalCleavageDrawPileRepositoryHasCleavage(Gherkin.AND_THEN, application, [commonCleavage1(), commonCleavage2()])
    ])
])
