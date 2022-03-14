import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { EventType } from '../EventType'
import { PlayerJoinBarEvent } from './PlayerJoinBarEvent'
import { PlayerMoveEvent } from '../playerMove/PlayerMoveEvent'
import { theBarRepositoryHasAvailableBarStool, theBarRepositoryHasAvailableTableStool, theBarRepositoryHasOccupiedBarStool, theBarRepositoryHasOccupiedTableStool } from '../../tests/unitTests/barRepository'
import { InstallNewTableEvent } from '../installNewTable/InstallNewTableEvent'
import { PlayerQuitEvent } from '../playerQuit/PlayerQuitEvent'
import { player1, stool1A, stoolBarA } from '../../tests/testContexts'

feature(EventType.PLAYER_JOIN_BAR, [
    clientScenario('Scenario 1 : player join bar with available table stool', [
        app => theBarRepositoryHasAvailableTableStool(Gherkin.GIVEN, app, [stool1A]),
        app => theBarRepositoryHasOccupiedTableStool(Gherkin.AND_GIVEN, app, new Map()),
        app => whenEventOccurs(app, new PlayerJoinBarEvent(player1().username)),
        app => theBarRepositoryHasAvailableTableStool(Gherkin.THEN, app, []),
        app => theBarRepositoryHasOccupiedTableStool(Gherkin.AND_THEN, app, new Map([[player1().username, stool1A]])),
        app => theEventIsSent(Gherkin.AND_THEN, app, new PlayerMoveEvent(player1().username, stool1A.position))
    ]),
    clientScenario('Scenario 2 : player join bar with no available table stool', [
        app => theBarRepositoryHasAvailableTableStool(Gherkin.GIVEN, app, []),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_GIVEN, app, [stoolBarA]),
        app => theBarRepositoryHasOccupiedBarStool(Gherkin.AND_GIVEN, app, new Map()),
        app => whenEventOccurs(app, new PlayerJoinBarEvent(player1().username)),
        app => theBarRepositoryHasAvailableTableStool(Gherkin.THEN, app, []),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_THEN, app, []),
        app => theBarRepositoryHasOccupiedBarStool(Gherkin.AND_THEN, app, new Map([[player1().username, stoolBarA]])),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new PlayerMoveEvent(player1().username, stoolBarA.position),
            new InstallNewTableEvent()
        ])
    ]),
    clientScenario('Scenario 3 : player join bar with no available stool and no available bar stool', [
        app => theBarRepositoryHasAvailableTableStool(Gherkin.GIVEN, app, []),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_GIVEN, app, []),
        app => whenEventOccurs(app, new PlayerJoinBarEvent(player1().username)),
        app => theBarRepositoryHasAvailableTableStool(Gherkin.THEN, app, []),
        app => theBarRepositoryHasAvailableBarStool(Gherkin.AND_THEN, app, []),
        app => theBarRepositoryHasOccupiedTableStool(Gherkin.AND_THEN, app, new Map()),
        app => theBarRepositoryHasOccupiedBarStool(Gherkin.AND_THEN, app, new Map()),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new PlayerQuitEvent(player1().username)
        ])
    ])
])
