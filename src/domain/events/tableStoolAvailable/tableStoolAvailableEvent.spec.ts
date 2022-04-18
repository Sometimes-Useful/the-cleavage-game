import type { Position } from '../../entities/Position'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { player1, player2, stool1A, stool1B, stoolBarA, stoolBarB } from '../../tests/testContexts'
import { theBarRepositoryHasAvailableBarStool, theBarRepositoryHasAvailableTableStool, theBarRepositoryHasOccupiedBarStool, theBarRepositoryHasOccupiedTableStool } from '../../tests/unitTests/barRepository'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { EventType } from '../EventType'
import { InstallNewTableEvent } from '../installNewTable/InstallNewTableEvent'
import { PlayerMoveEvent } from '../playerMove/PlayerMoveEvent'
import { TableStoolAvailableEvent } from './TableStoolAvailableEvent'

const playerPositionOnStool1A:Position = { x: -0.1, y: -2.9 }
const playerPositionOnStool1B:Position = { x: 0.7, y: -2.9 }

feature(EventType.TABLE_STOOL_AVAILABLE, [
    clientScenario('Scenario 1 - Install player on table stool when 1 table stool available', [
        app => theBarRepositoryHasOccupiedBarStool(Gherkin.GIVEN, app, new Map([[player1().username, stoolBarA]])),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_GIVEN, app, []),
        app => theBarRepositoryHasAvailableTableStool(Gherkin.AND_GIVEN, app, [stool1A]),
        app => whenEventOccurs(app, new TableStoolAvailableEvent()),
        app => theBarRepositoryHasOccupiedBarStool(Gherkin.THEN, app, new Map()),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_THEN, app, stoolBarA),
        app => theBarRepositoryHasAvailableTableStool(Gherkin.AND_THEN, app, []),
        app => theBarRepositoryHasOccupiedTableStool(Gherkin.AND_THEN, app, new Map([[player1().username, stool1A]])),
        app => theEventIsSent(Gherkin.AND_THEN, app, new PlayerMoveEvent(player1().username, playerPositionOnStool1A))
    ]),
    clientScenario('Scenario 2 - Keep player on bar stool when no table stool available', [
        app => theBarRepositoryHasOccupiedBarStool(Gherkin.GIVEN, app, new Map([[player1().username, stoolBarA]])),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_GIVEN, app, []),
        app => theBarRepositoryHasAvailableTableStool(Gherkin.AND_GIVEN, app, []),
        app => whenEventOccurs(app, new TableStoolAvailableEvent()),
        app => theBarRepositoryHasOccupiedBarStool(Gherkin.THEN, app, new Map([[player1().username, stoolBarA]])),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_THEN, app, []),
        app => theBarRepositoryHasAvailableTableStool(Gherkin.AND_THEN, app, []),
        app => theBarRepositoryHasOccupiedTableStool(Gherkin.AND_THEN, app, new Map()),
        app => theEventIsSent(Gherkin.AND_THEN, app, new InstallNewTableEvent())
    ]),
    clientScenario('Scenario 3 - Install 2 players on table stools when 2 table stool available', [
        app => theBarRepositoryHasOccupiedBarStool(Gherkin.GIVEN, app, new Map([[player1().username, stoolBarA], [player2().username, stoolBarB]])),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_GIVEN, app, []),
        app => theBarRepositoryHasAvailableTableStool(Gherkin.AND_GIVEN, app, [stool1A, stool1B]),
        app => whenEventOccurs(app, new TableStoolAvailableEvent()),
        app => theBarRepositoryHasOccupiedBarStool(Gherkin.THEN, app, new Map()),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_THEN, app, [stoolBarA, stoolBarB]),
        app => theBarRepositoryHasAvailableTableStool(Gherkin.AND_THEN, app, []),
        app => theBarRepositoryHasOccupiedTableStool(Gherkin.AND_THEN, app, new Map([[player1().username, stool1A], [player2().username, stool1B]])),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new PlayerMoveEvent(player1().username, playerPositionOnStool1A),
            new PlayerMoveEvent(player2().username, playerPositionOnStool1B)
        ])
    ]),
    clientScenario('Scenario 4 - Install 2 players on table stools when 1 table stool available', [
        app => theBarRepositoryHasOccupiedBarStool(Gherkin.GIVEN, app, new Map([[player1().username, stoolBarA], [player2().username, stoolBarB]])),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_GIVEN, app, []),
        app => theBarRepositoryHasAvailableTableStool(Gherkin.AND_GIVEN, app, [stool1A]),
        app => whenEventOccurs(app, new TableStoolAvailableEvent()),
        app => theBarRepositoryHasOccupiedBarStool(Gherkin.THEN, app, new Map([[player2().username, stoolBarB]])),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_THEN, app, [stoolBarA]),
        app => theBarRepositoryHasAvailableTableStool(Gherkin.AND_THEN, app, []),
        app => theBarRepositoryHasOccupiedTableStool(Gherkin.AND_THEN, app, new Map([[player1().username, stool1A]])),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new PlayerMoveEvent(player1().username, playerPositionOnStool1A),
            new InstallNewTableEvent()
        ])
    ])
])
