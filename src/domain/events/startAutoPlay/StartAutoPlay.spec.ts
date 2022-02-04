import { Cleavage } from '../../entities/Cleavage'
import { Gherkin } from '../../tests/Gherkin'
import { cleavageTitle1, cleavageTitle2, drouateChoice, gocheChoice } from '../../tests/testContexts'
import { feature, scenario } from '../../tests/testSuites'
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
    scenario(`Scenario 1 : Start autoplay with 1 minute autoplay with current date at ${currentDate1.toISOString()}`, [
        application => theDateGatewayHasCurrentDate(Gherkin.GIVEN, application, currentDate1),
        application => theInterfaceGatewayHasAutoplayOptionDisabled(Gherkin.AND_THEN, application),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, application, new Cleavage(cleavageTitle1, gocheChoice(), drouateChoice())),
        application => whenEventOccurs(application, new StartAutoPlayEvent(1)),
        application => theEventIsSent(Gherkin.THEN, application, new DrawCleavageEvent()),
        application => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_THEN, application, new Date(Date.UTC(2022, 2, 4, 10, 1, 0))),
        application => theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.AND_THEN, application, 1),
        application => theInterfaceGatewayHasAutoplayOptionEnabled(Gherkin.AND_THEN, application)
    ]),
    scenario(`Scenario 2 : Start autoplay with 5 minute autoplay ${currentDate1.toISOString()}`, [
        application => theDateGatewayHasCurrentDate(Gherkin.GIVEN, application, currentDate1),
        application => theInterfaceGatewayHasAutoplayOptionDisabled(Gherkin.AND_THEN, application),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, application, new Cleavage(cleavageTitle1, gocheChoice(), drouateChoice())),
        application => whenEventOccurs(application, new StartAutoPlayEvent(5)),
        application => theEventIsSent(Gherkin.THEN, application, new DrawCleavageEvent()),
        application => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_THEN, application, new Date(Date.UTC(2022, 2, 4, 10, 5, 0))),
        application => theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.AND_THEN, application, 5),
        application => theInterfaceGatewayHasAutoplayOptionEnabled(Gherkin.AND_THEN, application)
    ]),
    scenario(`Scenario 3 : Start autoplay with 5 minute autoplay ${currentDate2.toISOString()}`, [
        application => theDateGatewayHasCurrentDate(Gherkin.GIVEN, application, currentDate2),
        application => theInterfaceGatewayHasAutoplayOptionDisabled(Gherkin.AND_THEN, application),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, application, new Cleavage(cleavageTitle2, gocheChoice(), drouateChoice())),
        application => whenEventOccurs(application, new StartAutoPlayEvent(5)),
        application => theEventIsSent(Gherkin.THEN, application, new DrawCleavageEvent()),
        application => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_THEN, application, new Date(Date.UTC(2022, 2, 4, 11, 5, 0))),
        application => theAutoPlayRepositoryHasAutoPlayInterval(Gherkin.AND_THEN, application, 5),
        application => theInterfaceGatewayHasAutoplayOptionEnabled(Gherkin.AND_THEN, application)
    ])
])
