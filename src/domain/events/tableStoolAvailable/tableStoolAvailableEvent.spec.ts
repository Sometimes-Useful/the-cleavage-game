import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { player1, stool1A, stoolBarA } from '../../tests/testContexts'
import { theBarRepositoryHasAvailableBarStool, theBarRepositoryHasAvailableTableStool, theBarRepositoryHasOccupiedBarStool, theBarRepositoryHasOccupiedTableStool } from '../../tests/unitTests/barRepository'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { EventType } from '../EventType'
import { InstallNewTableEvent } from '../installNewTable/InstallNewTableEvent'
import { PlayerMoveEvent } from '../playerMove/PlayerMoveEvent'
import { TableStoolAvailableEvent } from './TableStoolAvailableEvent'

feature(EventType.TABLE_STOOL_AVAILABLE, [
    clientScenario('Scenario 1 ', [
        app => theBarRepositoryHasOccupiedBarStool(Gherkin.GIVEN, app, new Map([[player1().username, stoolBarA]])),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_GIVEN, app, []),
        app => theBarRepositoryHasAvailableTableStool(Gherkin.AND_GIVEN, app, [stool1A]),
        app => whenEventOccurs(app, new TableStoolAvailableEvent()),
        app => theBarRepositoryHasOccupiedBarStool(Gherkin.THEN, app, new Map()),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_THEN, app, stoolBarA),
        app => theBarRepositoryHasAvailableTableStool(Gherkin.AND_THEN, app, []),
        app => theBarRepositoryHasOccupiedTableStool(Gherkin.AND_THEN, app, new Map([[player1().username, stool1A]])),
        app => theEventIsSent(Gherkin.AND_THEN, app, new PlayerMoveEvent(player1().username, stool1A.position))
    ]),
    clientScenario('Scenario 2 ', [
        app => theBarRepositoryHasOccupiedBarStool(Gherkin.GIVEN, app, new Map([[player1().username, stoolBarA]])),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_GIVEN, app, []),
        app => theBarRepositoryHasAvailableTableStool(Gherkin.AND_GIVEN, app, []),
        app => whenEventOccurs(app, new TableStoolAvailableEvent()),
        app => theBarRepositoryHasOccupiedBarStool(Gherkin.THEN, app, new Map([[player1().username, stoolBarA]])),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_THEN, app, []),
        app => theBarRepositoryHasAvailableTableStool(Gherkin.AND_THEN, app, []),
        app => theBarRepositoryHasOccupiedTableStool(Gherkin.AND_THEN, app, new Map()),
        app => theEventIsSent(Gherkin.AND_THEN, app, new InstallNewTableEvent())
    ])
])
