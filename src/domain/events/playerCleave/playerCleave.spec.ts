import { feature, scenario } from '../../tests/testSuites'
import { theChatGatewaySendMessageToPlayer, theCleavageRepositoryHasCurrentCleavage, whenEventOccurs } from '../../tests/unitTests'
import { PlayerCleave } from '../../entities/PlayerCleave'
import { PlayerCleaveEvent } from './PlayerCleaveEvent'
import { Gherkin } from '../../tests/Gherkin'
import { Cleavage } from '../../entities/Cleavage'
import { cleavageTitle, player } from '../../tests/testContexts'
import { MessageForPlayer } from '../../entities/MessageForPlayer'
feature(new PlayerCleaveEvent(PlayerCleave.LEFT, player), [
    scenario(`Scenario 1 : ${PlayerCleave.LEFT}`, [
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle)),
        application => whenEventOccurs(application.gateways.event, new PlayerCleaveEvent(PlayerCleave.LEFT, player)),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.THEN, application.repositories.cleavage, new Cleavage(cleavageTitle, 1, 0, new Map([[player, PlayerCleave.LEFT]])))
    ]),
    scenario(`Scenario 2 : ${PlayerCleave.RIGHT}`, [
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle)),
        application => whenEventOccurs(application.gateways.event, new PlayerCleaveEvent(PlayerCleave.RIGHT, player)),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.THEN, application.repositories.cleavage, new Cleavage(cleavageTitle, 0, 1, new Map([[player, PlayerCleave.RIGHT]])))
    ]),
    scenario(`Scenario 3 : Already ${PlayerCleave.RIGHT} for ${player} and player cleave ${PlayerCleave.RIGHT}`, [
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle, 0, 1, new Map([[player, PlayerCleave.RIGHT]]))),
        application => whenEventOccurs(application.gateways.event, new PlayerCleaveEvent(PlayerCleave.RIGHT, player)),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.THEN, application.repositories.cleavage, new Cleavage(cleavageTitle, 0, 1, new Map([[player, PlayerCleave.RIGHT]]))),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application.gateways.chat, new MessageForPlayer(player, `You have still cleave ${PlayerCleave.RIGHT}`))
    ]),
    scenario(`Scenario 4 : Already ${PlayerCleave.LEFT} for ${player} and player cleave ${PlayerCleave.LEFT}`, [
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle, 1, 0, new Map([[player, PlayerCleave.LEFT]]))),
        application => whenEventOccurs(application.gateways.event, new PlayerCleaveEvent(PlayerCleave.LEFT, player)),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.THEN, application.repositories.cleavage, new Cleavage(cleavageTitle, 1, 0, new Map([[player, PlayerCleave.LEFT]]))),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application.gateways.chat, new MessageForPlayer(player, `You have still cleave ${PlayerCleave.LEFT}`))
    ]),
    scenario(`Scenario 5 : Already ${PlayerCleave.LEFT} for ${player} and player cleave ${PlayerCleave.RIGHT}`, [
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle, 1, 0, new Map([[player, PlayerCleave.LEFT]]))),
        application => whenEventOccurs(application.gateways.event, new PlayerCleaveEvent(PlayerCleave.RIGHT, player)),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.THEN, application.repositories.cleavage, new Cleavage(cleavageTitle, 0, 1, new Map([[player, PlayerCleave.RIGHT]])))
    ]),
    scenario(`Scenario 6 : Already ${PlayerCleave.RIGHT} for ${player} and player cleave ${PlayerCleave.LEFT}`, [
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle, 0, 1, new Map([[player, PlayerCleave.RIGHT]]))),
        application => whenEventOccurs(application.gateways.event, new PlayerCleaveEvent(PlayerCleave.LEFT, player)),
        application => theCleavageRepositoryHasCurrentCleavage(Gherkin.THEN, application.repositories.cleavage, new Cleavage(cleavageTitle, 1, 0, new Map([[player, PlayerCleave.LEFT]])))
    ])
])
