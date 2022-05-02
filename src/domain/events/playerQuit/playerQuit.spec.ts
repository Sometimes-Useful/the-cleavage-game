import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { cleavageTitle1, player1 } from '../../tests/testContexts'
import { EventType } from '../EventType'
import { Gherkin } from '../../tests/Gherkin'
import { Cleavage } from '../../entities/Cleavage'
import { PlayerQuitEvent } from './PlayerQuitEvent'
import { theCurrentCleavageRepositoryDontHaveCleavage, theCurrentCleavageRepositoryHasCleavage } from '../../tests/unitTests/cleavageRepository'
import { theInterfaceGatewayHasCurrentCleavage } from '../../tests/unitTests/interfaceGateway'
import { thePlayerRepositoryHasPlayers, thePlayerRepositoryDontHavePlayers } from '../../tests/unitTests/playerRepository'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { skip } from '../../tests/serverScenario'

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
        thePlayerRepositoryDontHavePlayers(Gherkin.AND_THEN),
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
        whenEventOccurs(new PlayerQuitEvent(player1().username))
    ], skip)
])
