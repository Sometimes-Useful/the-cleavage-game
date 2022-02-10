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
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'

feature(EventType.PLAYER_QUIT, [
    clientScenario(`Scenario 1 : ${JSON.stringify(player1)} quit when there is no current cleavage`, [
        application => thePlayerRepositoryHasPlayers(Gherkin.GIVEN, application, player1),
        application => theCurrentCleavageRepositoryDontHaveCleavage(Gherkin.AND_GIVEN, application),
        application => whenEventOccurs(application, new PlayerQuitEvent(player1)),
        application => thePlayerRepositoryDontHavePlayers(Gherkin.THEN, application)
    ]),
    clientScenario(`Scenario 2 : ${JSON.stringify(player1)} quit when there is current cleavage`, [
        application => thePlayerRepositoryHasPlayers(Gherkin.GIVEN, application, player1),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, application, new Cleavage(cleavageTitle1, { name: 'Gôche', players: [player1] }, { name: 'Drouate', players: [] }, [player1])),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, application, new Cleavage(cleavageTitle1, { name: 'Gôche', players: [player1] }, { name: 'Drouate', players: [] }, [player1])),
        application => whenEventOccurs(application, new PlayerQuitEvent(player1)),
        application => thePlayerRepositoryDontHavePlayers(Gherkin.AND_THEN, application),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, application, new Cleavage(cleavageTitle1, { name: 'Gôche', players: [] }, { name: 'Drouate', players: [] }, [])),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, new Cleavage(cleavageTitle1, { name: 'Gôche', players: [] }, { name: 'Drouate', players: [] }, []))
    ])
])
