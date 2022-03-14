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
        app => theDateGatewayHasCurrentDate(Gherkin.GIVEN, app, new Date(Date.UTC(2022, 2, 4, 14, 20, 0))),
        app => theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.AND_GIVEN, app, 1),
        app => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, app, new Date(Date.UTC(2022, 2, 4, 14, 20, 0))),
        app => whenEventOccurs(app, new CheckAutoplayEvent()),
        app => theEventIsSent(Gherkin.THEN, app, new NewCleavageEvent()),
        app => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_THEN, app, new Date(Date.UTC(2022, 2, 4, 14, 21, 0)))
    ]),
    clientScenario('Scenario 2 : new cleavage when current date is after next Cleavage date', [
        app => theDateGatewayHasCurrentDate(Gherkin.GIVEN, app, new Date(Date.UTC(2022, 2, 4, 14, 19, 59))),
        app => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, app, new Date(Date.UTC(2022, 2, 4, 14, 20, 0))),
        app => whenEventOccurs(app, new CheckAutoplayEvent()),
        app => theEventIsSent(Gherkin.THEN, app, [])
    ]),
    clientScenario('Scenario 3 : on autoplay disabled', [
        app => theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.AND_GIVEN, app),
        app => whenEventOccurs(app, new CheckAutoplayEvent()),
        app => theEventIsSent(Gherkin.THEN, app, [])
    ]),
    clientScenario('Scenario 4 : new cleavage when current date is equal next Cleavage date', [
        app => theDateGatewayHasCurrentDate(Gherkin.GIVEN, app, new Date(Date.UTC(2022, 2, 4, 14, 20, 0))),
        app => theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.AND_GIVEN, app, 5),
        app => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, app, new Date(Date.UTC(2022, 2, 4, 14, 20, 0))),
        app => whenEventOccurs(app, new CheckAutoplayEvent()),
        app => theEventIsSent(Gherkin.THEN, app, new NewCleavageEvent()),
        app => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_THEN, app, new Date(Date.UTC(2022, 2, 4, 14, 25, 0)))
    ])
])
