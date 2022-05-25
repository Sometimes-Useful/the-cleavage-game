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
        theBarRepositoryHasAvailableTableStool(Gherkin.GIVEN, [stool1A]),
        theBarRepositoryHasOccupiedTableStool(Gherkin.AND_GIVEN, new Map()),
        whenEventOccurs(new PlayerJoinBarEvent(player1().username)),
        theBarRepositoryHasAvailableTableStool(Gherkin.THEN, []),
        theBarRepositoryHasOccupiedTableStool(Gherkin.AND_THEN, new Map([[player1().username, stool1A]])),
        theEventIsSent(Gherkin.AND_THEN, new PlayerMoveEvent(player1().username, stool1A.position))
    ]),
    clientScenario('Scenario 2 : player join bar with no available table stool', [
        theBarRepositoryHasAvailableTableStool(Gherkin.GIVEN, []),
        theBarRepositoryHasAvailableBarStool(Gherkin.AND_GIVEN, [stoolBarA]),
        theBarRepositoryHasOccupiedBarStool(Gherkin.AND_GIVEN, new Map()),
        whenEventOccurs(new PlayerJoinBarEvent(player1().username)),
        theBarRepositoryHasAvailableTableStool(Gherkin.THEN, []),
        theBarRepositoryHasAvailableBarStool(Gherkin.AND_THEN, []),
        theBarRepositoryHasOccupiedBarStool(Gherkin.AND_THEN, new Map([[player1().username, stoolBarA]])),
        theEventIsSent(Gherkin.AND_THEN, [
            new PlayerMoveEvent(player1().username, stoolBarA.position),
            new InstallNewTableEvent()
        ])
    ]),
    clientScenario('Scenario 3 : player join bar with no available stool and no available bar stool', [
        theBarRepositoryHasAvailableTableStool(Gherkin.GIVEN, []),
        theBarRepositoryHasAvailableBarStool(Gherkin.AND_GIVEN, []),
        whenEventOccurs(new PlayerJoinBarEvent(player1().username)),
        theBarRepositoryHasAvailableTableStool(Gherkin.THEN, []),
        theBarRepositoryHasAvailableBarStool(Gherkin.AND_THEN, []),
        theBarRepositoryHasOccupiedTableStool(Gherkin.AND_THEN, new Map()),
        theBarRepositoryHasOccupiedBarStool(Gherkin.AND_THEN, new Map()),
        theEventIsSent(Gherkin.AND_THEN, [
            new PlayerQuitEvent(player1().username)
        ])
    ])
])
