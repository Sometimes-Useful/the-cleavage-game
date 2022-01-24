import { feature, scenario } from '../../tests/testSuites'
import { theChatGatewaySendMessageToPlayer, theCleavageRepositoryDontHaveCurrentCleavage, theCleavageRepositoryHasCurrentCleavage, theInterfaceGatewayHasCurrentCleavage, thePlayerRepositoryDontHavePlayers, thePlayerRepositoryHasPlayers, whenEventOccurs } from '../../tests/unitTests'
import { cleavageTitle1, player1 } from '../../tests/testContexts'
import { EventType } from '../EventType'
import { PlayerJoinEvent } from './PlayerJoinEvent'
import { Gherkin } from '../../tests/Gherkin'
import { welcomePlayerMessage } from '../../entities/MessageForPlayer'
import { Cleavage } from '../../entities/Cleavage'
import { PlayerCleave } from '../../entities/PlayerCleave'

feature(EventType.PLAYER_JOIN, [
    scenario(`Scenario 1 : ${player1} join when there is no current cleavage`, [
        application => thePlayerRepositoryDontHavePlayers(Gherkin.GIVEN, application.repositories.player),
        application => theCleavageRepositoryDontHaveCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage),
        application => whenEventOccurs(application.gateways.event, new PlayerJoinEvent(player1)),
        application => theChatGatewaySendMessageToPlayer(Gherkin.THEN, application.gateways.chat, welcomePlayerMessage(player1)),
        application => thePlayerRepositoryHasPlayers(Gherkin.AND_THEN, application.repositories.player, player1)
    ]),
    scenario(`Scenario 2 : ${player1} join when there is current cleavage`, [
        application => thePlayerRepositoryDontHavePlayers(Gherkin.GIVEN, application.repositories.player),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle1)),
        application => whenEventOccurs(application.gateways.event, new PlayerJoinEvent(player1)),
        application => theChatGatewaySendMessageToPlayer(Gherkin.THEN, application.gateways.chat, welcomePlayerMessage(player1)),
        application => thePlayerRepositoryHasPlayers(Gherkin.AND_THEN, application.repositories.player, player1),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.AND_THEN, application.repositories.cleavage, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.NOTHING]]))),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application.gateways.interface, new Cleavage(cleavageTitle1, new Map([[player1.username, PlayerCleave.NOTHING]])))
    ])
])
