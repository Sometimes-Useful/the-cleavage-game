import { Cleavage } from '../../entities/Cleavage'
import { SpriteType } from '../../entities/SpriteType'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { cleavageTitle1, player1, stool1A, stoolBarA } from '../../tests/testContexts'
import { theBarRepositoryDontHaveAvailableBarStool, theBarRepositoryDontHaveAvailableTableStool, theBarRepositoryHasAvailableBarStool, theBarRepositoryHasAvailableTableStool, theBarRepositoryHasOccupiedBarStool, theBarRepositoryHasOccupiedTableStool } from '../../tests/unitTests/barRepository'
import { theCurrentCleavageRepositoryDontHaveCleavage, theCurrentCleavageRepositoryHasCleavage } from '../../tests/unitTests/cleavageRepository'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayHasCurrentCleavage, theInterfaceGatewayHasEntityInterfaceState } from '../../tests/unitTests/interfaceGateway'
import { thePlayerRepositoryDontHavePlayers, thePlayerRepositoryHasPlayers } from '../../tests/unitTests/playerRepository'
import { EraseEvent } from '../erase/EraseEvent'
import { EventType } from '../EventType'
import { PlayerQuitEvent } from './PlayerQuitEvent'

feature(EventType.PLAYER_QUIT, [
    clientScenario(`Scenario 1 : ${JSON.stringify(player1())} quit when there is no current cleavage`, [
        thePlayerRepositoryHasPlayers(Gherkin.GIVEN, [player1()]),
        theCurrentCleavageRepositoryDontHaveCleavage(Gherkin.AND_GIVEN),
        whenEventOccurs(new PlayerQuitEvent(player1().username)),
        thePlayerRepositoryDontHavePlayers(Gherkin.THEN)
    ]),
    clientScenario(`Scenario 2 : ${JSON.stringify(player1())} quit when there is current cleavage`, [
        thePlayerRepositoryHasPlayers(Gherkin.GIVEN, [player1()]),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [player1().username] }, rightChoice: { name: 'Drouate', players: [] }, players: [player1().username] })),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [player1().username] }, rightChoice: { name: 'Drouate', players: [] }, players: [player1().username] })),
        whenEventOccurs(new PlayerQuitEvent(player1().username)),
        thePlayerRepositoryDontHavePlayers(Gherkin.THEN),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [] }, rightChoice: { name: 'Drouate', players: [] }, players: [] })),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [] }, rightChoice: { name: 'Drouate', players: [] }, players: [] }))
    ]),
    clientScenario(`Scenario 3 : ${JSON.stringify(player1())} quit when he is not a player`, [
        thePlayerRepositoryDontHavePlayers(Gherkin.GIVEN),
        whenEventOccurs(new PlayerQuitEvent(player1().username)),
        thePlayerRepositoryDontHavePlayers(Gherkin.THEN),
        theEventIsSent(Gherkin.AND_THEN, [])
    ]),
    clientScenario(`Scenario 4 : ${JSON.stringify(player1())} quit bar, free table stool and eraseEvent`, [
        thePlayerRepositoryHasPlayers(Gherkin.GIVEN, [player1()]),
        theBarRepositoryHasOccupiedTableStool(Gherkin.GIVEN, new Map([[player1().username, stool1A]])),
        theBarRepositoryDontHaveAvailableTableStool(Gherkin.AND_GIVEN),
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.AND_GIVEN, new Map([[player1().username, { position: stool1A.position, size: player1().size, spriteType: SpriteType.PLAYER }]])),
        whenEventOccurs(new PlayerQuitEvent(player1().username)),
        thePlayerRepositoryDontHavePlayers(Gherkin.THEN),
        theBarRepositoryHasAvailableTableStool(Gherkin.AND_THEN, stool1A),
        theBarRepositoryHasOccupiedTableStool(Gherkin.AND_THEN, new Map()),
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.AND_THEN, new Map([[player1().username, { position: stool1A.position, size: player1().size, spriteType: SpriteType.PLAYER }]])),
        theEventIsSent(Gherkin.AND_THEN, new EraseEvent(player1().username))
    ]),
    clientScenario(`Scenario 5 : ${JSON.stringify(player1())} quit bar, free bar stool and eraseEvent`, [
        thePlayerRepositoryHasPlayers(Gherkin.GIVEN, [player1()]),
        theBarRepositoryHasOccupiedBarStool(Gherkin.GIVEN, new Map([[player1().username, stoolBarA]])),
        theBarRepositoryDontHaveAvailableBarStool(Gherkin.AND_GIVEN),
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.AND_GIVEN, new Map([[player1().username, { position: stoolBarA.position, size: player1().size, spriteType: SpriteType.PLAYER }]])),
        whenEventOccurs(new PlayerQuitEvent(player1().username)),
        thePlayerRepositoryDontHavePlayers(Gherkin.THEN),
        theBarRepositoryHasAvailableBarStool(Gherkin.AND_THEN, stoolBarA),
        theBarRepositoryHasOccupiedBarStool(Gherkin.AND_THEN, new Map()),
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.AND_THEN, new Map([[player1().username, { position: stoolBarA.position, size: player1().size, spriteType: SpriteType.PLAYER }]])),
        theEventIsSent(Gherkin.AND_THEN, new EraseEvent(player1().username))
    ])
])
