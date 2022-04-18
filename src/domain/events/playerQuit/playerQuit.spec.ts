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

feature(EventType.PLAYER_QUIT, [
    clientScenario(`Scenario 1 : ${JSON.stringify(player1())} quit when there is no current cleavage`, [
        app => thePlayerRepositoryHasPlayers(Gherkin.GIVEN, app, [player1()]),
        app => theCurrentCleavageRepositoryDontHaveCleavage(Gherkin.AND_GIVEN, app),
        app => whenEventOccurs(app, new PlayerQuitEvent(player1().username)),
        app => thePlayerRepositoryDontHavePlayers(Gherkin.THEN, app)
    ]),
    clientScenario(`Scenario 2 : ${JSON.stringify(player1())} quit when there is current cleavage`, [
        app => thePlayerRepositoryHasPlayers(Gherkin.GIVEN, app, [player1()]),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [player1().username] }, rightChoice: { name: 'Drouate', players: [] }, players: [player1().username] })),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, app, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [player1().username] }, rightChoice: { name: 'Drouate', players: [] }, players: [player1().username] })),
        app => whenEventOccurs(app, new PlayerQuitEvent(player1().username)),
        app => thePlayerRepositoryDontHavePlayers(Gherkin.AND_THEN, app),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, app, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [] }, rightChoice: { name: 'Drouate', players: [] }, players: [] })),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, app, new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [] }, rightChoice: { name: 'Drouate', players: [] }, players: [] }))
    ]),
    clientScenario(`Scenario 3 : ${JSON.stringify(player1())} quit when he is not a player`, [
        app => thePlayerRepositoryDontHavePlayers(Gherkin.GIVEN, app),
        app => whenEventOccurs(app, new PlayerQuitEvent(player1().username)),
        app => thePlayerRepositoryDontHavePlayers(Gherkin.THEN, app),
        app => theEventIsSent(Gherkin.AND_THEN, app, [])
    ])
])
