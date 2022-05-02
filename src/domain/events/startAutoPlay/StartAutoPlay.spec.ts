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
        theDateGatewayHasCurrentDate(Gherkin.GIVEN, currentDate1),
        theInterfaceGatewayHasAutoplayOptionDisabled(Gherkin.AND_THEN),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, newCleavage(cleavageTitle1)),
        whenEventOccurs(new StartAutoPlayEvent(1)),
        theEventIsSent(Gherkin.THEN, new DrawCleavageEvent()),
        theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_THEN, new Date(Date.UTC(2022, 2, 4, 10, 1, 0))),
        theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.AND_THEN, 1),
        theInterfaceGatewayHasAutoplayOptionEnabled(Gherkin.AND_THEN)
    ]),
    clientScenario(`Scenario 2 : Start autoplay with 5 minute autoplay ${currentDate1.toISOString()}`, [
        theDateGatewayHasCurrentDate(Gherkin.GIVEN, currentDate1),
        theInterfaceGatewayHasAutoplayOptionDisabled(Gherkin.AND_THEN),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, newCleavage(cleavageTitle1)),
        whenEventOccurs(new StartAutoPlayEvent(5)),
        theEventIsSent(Gherkin.THEN, new DrawCleavageEvent()),
        theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_THEN, new Date(Date.UTC(2022, 2, 4, 10, 5, 0))),
        theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.AND_THEN, 5),
        theInterfaceGatewayHasAutoplayOptionEnabled(Gherkin.AND_THEN)
    ]),
    clientScenario(`Scenario 3 : Start autoplay with 5 minute autoplay ${currentDate2.toISOString()}`, [
        theDateGatewayHasCurrentDate(Gherkin.GIVEN, currentDate2),
        theInterfaceGatewayHasAutoplayOptionDisabled(Gherkin.AND_THEN),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, newCleavage(cleavageTitle2)),
        whenEventOccurs(new StartAutoPlayEvent(5)),
        theEventIsSent(Gherkin.THEN, new DrawCleavageEvent()),
        theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_THEN, new Date(Date.UTC(2022, 2, 4, 11, 5, 0))),
        theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.AND_THEN, 5),
        theInterfaceGatewayHasAutoplayOptionEnabled(Gherkin.AND_THEN)
    ])
])
export function newCleavage (title:string): Cleavage {
    return new Cleavage({ title, leftChoice: gocheChoice(), rightChoice: drouateChoice(), players: [] })
}
