import { feature, scenario } from '../../tests/testSuites'
import { theCleavageRepositoryDontHaveCurrentCleavage, theCleavageRepositoryHasCurrentCleavage, theInterfaceGatewayHasCurrentCleavage, thePlayerRepositoryDontHavePlayers, thePlayerRepositoryHasPlayers, whenEventOccurs } from '../../tests/unitTests'
import { cleavageTitle1, player1 } from '../../tests/testContexts'
import { EventType } from '../EventType'
import { Gherkin } from '../../tests/Gherkin'
import { Cleavage } from '../../entities/Cleavage'
import { PlayerCleave } from '../../entities/PlayerCleave'
import { PlayerQuitEvent } from './PlayerQuitEvent'

feature(EventType.PLAYER_QUIT, [
    scenario(`Scenario 1 : ${player1} quit when there is no current cleavage`, [
        application => thePlayerRepositoryHasPlayers(Gherkin.GIVEN, application.repositories.player, player1),
        application => theCleavageRepositoryDontHaveCurrentCleavage(Gherkin.AND_GIVEN, application.repositories.cleavage),
        application => whenEventOccurs(application.gateways.event, new PlayerQuitEvent(player1)),
        application => thePlayerRepositoryDontHavePlayers(Gherkin.THEN, application.repositories.player)
    ]),
    scenario(`Scenario 2 : ${player1} join when there is current cleavage`, [
        application => thePlayerRepositoryHasPlayers(Gherkin.GIVEN, application.repositories.player, player1),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.AND_GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.NOTHING]]))),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, application.gateways.interface, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.NOTHING]]))),
        application => whenEventOccurs(application.gateways.event, new PlayerQuitEvent(player1)),
        application => thePlayerRepositoryDontHavePlayers(Gherkin.AND_THEN, application.repositories.player),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.AND_THEN, application.repositories.cleavage, new Cleavage(cleavageTitle1)),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application.gateways.interface, new Cleavage(cleavageTitle1))
    ])
])
