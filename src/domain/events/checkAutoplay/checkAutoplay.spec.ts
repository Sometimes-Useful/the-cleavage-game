import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { EventType } from '../EventType'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { CheckAutoplayEvent } from './CheckAutoplayEvent'
import { theDateGatewayHasCurrentDate } from '../../tests/unitTests/dateGateway'
import { Gherkin } from '../../tests/Gherkin'
import { theAutoPlayRepositoryDontHaveNextCleavageDate, theAutoPlayRepositoryHasAutoPlayInterval, theAutoPlayRepositoryHasNextCleavageDate } from '../../tests/unitTests/autoplayRepository'
import { NewCleavageEvent } from '../newCleavage/NewCleavageEvent'

feature(EventType.CHECK_AUTOPLAY, [
    clientScenario('Scenario 1 : new cleavage when current date is after next Cleavage date', [
        theDateGatewayHasCurrentDate(Gherkin.GIVEN, new Date(Date.UTC(2022, 2, 4, 14, 20, 0))),
        theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.AND_GIVEN, 1),
        theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, new Date(Date.UTC(2022, 2, 4, 14, 20, 0))),
        whenEventOccurs(new CheckAutoplayEvent()),
        theEventIsSent(Gherkin.THEN, new NewCleavageEvent()),
        theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_THEN, new Date(Date.UTC(2022, 2, 4, 14, 21, 0)))
    ]),
    clientScenario('Scenario 2 : new cleavage when current date is after next Cleavage date', [
        theDateGatewayHasCurrentDate(Gherkin.GIVEN, new Date(Date.UTC(2022, 2, 4, 14, 19, 59))),
        theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, new Date(Date.UTC(2022, 2, 4, 14, 20, 0))),
        whenEventOccurs(new CheckAutoplayEvent()),
        theEventIsSent(Gherkin.THEN, [])
    ]),
    clientScenario('Scenario 3 : on autoplay disabled', [
        theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.AND_GIVEN),
        whenEventOccurs(new CheckAutoplayEvent()),
        theEventIsSent(Gherkin.THEN, [])
    ]),
    clientScenario('Scenario 4 : new cleavage when current date is equal next Cleavage date', [
        theDateGatewayHasCurrentDate(Gherkin.GIVEN, new Date(Date.UTC(2022, 2, 4, 14, 20, 0))),
        theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.AND_GIVEN, 5),
        theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, new Date(Date.UTC(2022, 2, 4, 14, 20, 0))),
        whenEventOccurs(new CheckAutoplayEvent()),
        theEventIsSent(Gherkin.THEN, new NewCleavageEvent()),
        theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_THEN, new Date(Date.UTC(2022, 2, 4, 14, 25, 0)))
    ])
])
