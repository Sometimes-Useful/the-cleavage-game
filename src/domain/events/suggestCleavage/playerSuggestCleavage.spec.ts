import { Cleavage } from '../../entities/Cleavage'
import { MessageForPlayer } from '../../entities/MessageForPlayer'
import { cleavageAlreadySuggested, cleavageSuggested } from '../../entities/playerMessages'
import { Gherkin } from '../../tests/Gherkin'
import { cleavageTitle1, player1 } from '../../tests/testContexts'
import { feature, scenario } from '../../tests/testSuites'
import { theCleavageRepositoryHasPublicCleavages, whenEventOccurs, theChatGatewaySendMessageToPlayer } from '../../tests/unitTests'
import { EventType } from '../EventType'
import { PlayerSuggestCleavageEvent } from './PlayerSuggestCleavageEvent'

feature(EventType.PLAYER_SUGGEST_CLEAVAGE, [
    scenario('Scenario 1 : With no public cleavage', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application.repositories.cleavage, []),
        application => whenEventOccurs(application.gateways.event, new PlayerSuggestCleavageEvent(player1, new Cleavage(cleavageTitle1))),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.THEN, application.repositories.cleavage, [new Cleavage(cleavageTitle1)]),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application.gateways.chat, new MessageForPlayer(player1, cleavageSuggested(player1, cleavageTitle1)))
    ]),
    scenario('Scenario 2 : With still existing public cleavage', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application.repositories.cleavage, new Cleavage(cleavageTitle1)),
        application => whenEventOccurs(application.gateways.event, new PlayerSuggestCleavageEvent(player1, new Cleavage(cleavageTitle1))),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.THEN, application.repositories.cleavage, new Cleavage(cleavageTitle1)),
        application => theChatGatewaySendMessageToPlayer(Gherkin.THEN, application.gateways.chat, new MessageForPlayer(player1, cleavageAlreadySuggested))
    ])
])
