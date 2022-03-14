import { Cleavage } from '../../entities/Cleavage'
import { Gherkin } from '../../tests/Gherkin'
import { cleavageTitle1, cleavageTitle2, drouateChoice, gocheChoice } from '../../tests/testContexts'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { theAutoPlayRepositoryHasAutoPlayInterval, theAutoPlayRepositoryHasNextCleavageDate } from '../../tests/unitTests/autoplayRepository'
import { theCurrentCleavageRepositoryHasCleavage } from '../../tests/unitTests/cleavageRepository'
import { theDateGatewayHasCurrentDate } from '../../tests/unitTests/dateGateway'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayHasAutoplayOptionDisabled, theInterfaceGatewayHasAutoplayOptionEnabled } from '../../tests/unitTests/interfaceGateway'
import { DrawCleavageEvent } from '../drawCleavage/DrawCleavageEvent'
import { EventType } from '../EventType'
import { StartAutoPlayEvent } from './StartAutoPlayEvent'

const currentDate1 = new Date(Date.UTC(2022, 2, 4, 10, 0, 0))
const currentDate2 = new Date(Date.UTC(2022, 2, 4, 11, 0, 0))
feature(EventType.START_AUTOPLAY, [
    clientScenario(`Scenario 1 : Start autoplay with 1 minute autoplay with current date at ${currentDate1.toISOString()}`, [
        app => theDateGatewayHasCurrentDate(Gherkin.GIVEN, app, currentDate1),
        app => theInterfaceGatewayHasAutoplayOptionDisabled(Gherkin.AND_THEN, app),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, newCleavage(cleavageTitle1)),
        app => whenEventOccurs(app, new StartAutoPlayEvent(1)),
        app => theEventIsSent(Gherkin.THEN, app, new DrawCleavageEvent()),
        app => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_THEN, app, new Date(Date.UTC(2022, 2, 4, 10, 1, 0))),
        app => theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.AND_THEN, app, 1),
        app => theInterfaceGatewayHasAutoplayOptionEnabled(Gherkin.AND_THEN, app)
    ]),
    clientScenario(`Scenario 2 : Start autoplay with 5 minute autoplay ${currentDate1.toISOString()}`, [
        app => theDateGatewayHasCurrentDate(Gherkin.GIVEN, app, currentDate1),
        app => theInterfaceGatewayHasAutoplayOptionDisabled(Gherkin.AND_THEN, app),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, newCleavage(cleavageTitle1)),
        app => whenEventOccurs(app, new StartAutoPlayEvent(5)),
        app => theEventIsSent(Gherkin.THEN, app, new DrawCleavageEvent()),
        app => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_THEN, app, new Date(Date.UTC(2022, 2, 4, 10, 5, 0))),
        app => theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.AND_THEN, app, 5),
        app => theInterfaceGatewayHasAutoplayOptionEnabled(Gherkin.AND_THEN, app)
    ]),
    clientScenario(`Scenario 3 : Start autoplay with 5 minute autoplay ${currentDate2.toISOString()}`, [
        app => theDateGatewayHasCurrentDate(Gherkin.GIVEN, app, currentDate2),
        app => theInterfaceGatewayHasAutoplayOptionDisabled(Gherkin.AND_THEN, app),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, newCleavage(cleavageTitle2)),
        app => whenEventOccurs(app, new StartAutoPlayEvent(5)),
        app => theEventIsSent(Gherkin.THEN, app, new DrawCleavageEvent()),
        app => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_THEN, app, new Date(Date.UTC(2022, 2, 4, 11, 5, 0))),
        app => theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.AND_THEN, app, 5),
        app => theInterfaceGatewayHasAutoplayOptionEnabled(Gherkin.AND_THEN, app)
    ])
])
export function newCleavage (title:string): Cleavage {
    return new Cleavage({ title, leftChoice: gocheChoice(), rightChoice: drouateChoice(), players: [] })
}
