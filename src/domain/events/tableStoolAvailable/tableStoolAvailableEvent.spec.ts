import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { player1, player2, playerPositionOnStool1A, playerPositionOnStool1B, stool1A, stool1B, stoolBarA, stoolBarB } from '../../tests/testContexts'
import { theBarRepositoryHasAvailableBarStool, theBarRepositoryHasAvailableTableStool, theBarRepositoryHasOccupiedBarStool, theBarRepositoryHasOccupiedTableStool } from '../../tests/unitTests/barRepository'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { EventType } from '../EventType'
import { InstallNewTableEvent } from '../installNewTable/InstallNewTableEvent'
import { PlayerMoveEvent } from '../playerMove/PlayerMoveEvent'
import { TableStoolAvailableEvent } from './TableStoolAvailableEvent'

feature(EventType.TABLE_STOOL_AVAILABLE, [
    clientScenario('Scenario 1 - Install player on table stool when 1 table stool available', [
        theBarRepositoryHasOccupiedBarStool(Gherkin.GIVEN, new Map([[player1().username, stoolBarA]])),
        theBarRepositoryHasAvailableBarStool(Gherkin.AND_GIVEN, []),
        theBarRepositoryHasAvailableTableStool(Gherkin.AND_GIVEN, [stool1A]),
        whenEventOccurs(new TableStoolAvailableEvent()),
        theBarRepositoryHasOccupiedBarStool(Gherkin.THEN, new Map()),
        theBarRepositoryHasAvailableBarStool(Gherkin.AND_THEN, stoolBarA),
        theBarRepositoryHasAvailableTableStool(Gherkin.AND_THEN, []),
        theBarRepositoryHasOccupiedTableStool(Gherkin.AND_THEN, new Map([[player1().username, stool1A]])),
        theEventIsSent(Gherkin.AND_THEN, new PlayerMoveEvent(player1().username, playerPositionOnStool1A))
    ]),
    clientScenario('Scenario 2 - Keep player on bar stool when no table stool available', [
        theBarRepositoryHasOccupiedBarStool(Gherkin.GIVEN, new Map([[player1().username, stoolBarA]])),
        theBarRepositoryHasAvailableBarStool(Gherkin.AND_GIVEN, []),
        theBarRepositoryHasAvailableTableStool(Gherkin.AND_GIVEN, []),
        whenEventOccurs(new TableStoolAvailableEvent()),
        theBarRepositoryHasOccupiedBarStool(Gherkin.THEN, new Map([[player1().username, stoolBarA]])),
        theBarRepositoryHasAvailableBarStool(Gherkin.AND_THEN, []),
        theBarRepositoryHasAvailableTableStool(Gherkin.AND_THEN, []),
        theBarRepositoryHasOccupiedTableStool(Gherkin.AND_THEN, new Map()),
        theEventIsSent(Gherkin.AND_THEN, new InstallNewTableEvent())
    ]),
    clientScenario('Scenario 3 - Install 2 players on table stools when 2 table stool available', [
        theBarRepositoryHasOccupiedBarStool(Gherkin.GIVEN, new Map([[player1().username, stoolBarA], [player2().username, stoolBarB]])),
        theBarRepositoryHasAvailableBarStool(Gherkin.AND_GIVEN, []),
        theBarRepositoryHasAvailableTableStool(Gherkin.AND_GIVEN, [stool1A, stool1B]),
        whenEventOccurs(new TableStoolAvailableEvent()),
        theBarRepositoryHasOccupiedBarStool(Gherkin.THEN, new Map()),
        theBarRepositoryHasAvailableBarStool(Gherkin.AND_THEN, [stoolBarA, stoolBarB]),
        theBarRepositoryHasAvailableTableStool(Gherkin.AND_THEN, []),
        theBarRepositoryHasOccupiedTableStool(Gherkin.AND_THEN, new Map([[player1().username, stool1A], [player2().username, stool1B]])),
        theEventIsSent(Gherkin.AND_THEN, [
            new PlayerMoveEvent(player1().username, playerPositionOnStool1A),
            new PlayerMoveEvent(player2().username, playerPositionOnStool1B)
        ])
    ]),
    clientScenario('Scenario 4 - Install 2 players on table stools when 1 table stool available', [
        theBarRepositoryHasOccupiedBarStool(Gherkin.GIVEN, new Map([[player1().username, stoolBarA], [player2().username, stoolBarB]])),
        theBarRepositoryHasAvailableBarStool(Gherkin.AND_GIVEN, []),
        theBarRepositoryHasAvailableTableStool(Gherkin.AND_GIVEN, [stool1A]),
        whenEventOccurs(new TableStoolAvailableEvent()),
        theBarRepositoryHasOccupiedBarStool(Gherkin.THEN, new Map([[player2().username, stoolBarB]])),
        theBarRepositoryHasAvailableBarStool(Gherkin.AND_THEN, [stoolBarA]),
        theBarRepositoryHasAvailableTableStool(Gherkin.AND_THEN, []),
        theBarRepositoryHasOccupiedTableStool(Gherkin.AND_THEN, new Map([[player1().username, stool1A]])),
        theEventIsSent(Gherkin.AND_THEN, [
            new PlayerMoveEvent(player1().username, playerPositionOnStool1A),
            new InstallNewTableEvent()
        ])
    ])
])
