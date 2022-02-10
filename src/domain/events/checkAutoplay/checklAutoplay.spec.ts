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
        application => theDateGatewayHasCurrentDate(Gherkin.GIVEN, application, new Date(Date.UTC(2022, 2, 4, 14, 20, 0))),
        application => theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.AND_GIVEN, application, 1),
        application => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, application, new Date(Date.UTC(2022, 2, 4, 14, 20, 0))),
        application => whenEventOccurs(application, new CheckAutoplayEvent()),
        application => theEventIsSent(Gherkin.THEN, application, new NewCleavageEvent()),
        application => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_THEN, application, new Date(Date.UTC(2022, 2, 4, 14, 21, 0)))
    ]),
    clientScenario('Scenario 2 : new cleavage when current date is after next Cleavage date', [
        application => theDateGatewayHasCurrentDate(Gherkin.GIVEN, application, new Date(Date.UTC(2022, 2, 4, 14, 19, 59))),
        application => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, application, new Date(Date.UTC(2022, 2, 4, 14, 20, 0))),
        application => whenEventOccurs(application, new CheckAutoplayEvent()),
        application => theEventIsSent(Gherkin.THEN, application, [])
    ]),
    clientScenario('Scenario 3 : on autoplay disabled', [
        application => theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.AND_GIVEN, application),
        application => whenEventOccurs(application, new CheckAutoplayEvent()),
        application => theEventIsSent(Gherkin.THEN, application, [])
    ]),
    clientScenario('Scenario 4 : new cleavage when current date is equal next Cleavage date', [
        application => theDateGatewayHasCurrentDate(Gherkin.GIVEN, application, new Date(Date.UTC(2022, 2, 4, 14, 20, 0))),
        application => theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.AND_GIVEN, application, 5),
        application => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, application, new Date(Date.UTC(2022, 2, 4, 14, 20, 0))),
        application => whenEventOccurs(application, new CheckAutoplayEvent()),
        application => theEventIsSent(Gherkin.THEN, application, new NewCleavageEvent()),
        application => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_THEN, application, new Date(Date.UTC(2022, 2, 4, 14, 25, 0)))
    ])
])
