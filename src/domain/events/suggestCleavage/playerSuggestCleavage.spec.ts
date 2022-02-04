import { Cleavage } from '../../entities/Cleavage'
import { MessageForPlayer } from '../../entities/MessageForPlayer'
import { cleavageAlreadySuggested, cleavageSuggested } from '../../entities/playerMessages'
import { Gherkin } from '../../tests/Gherkin'
import { cleavageTitle1, drouateChoice, gocheChoice, player1 } from '../../tests/testContexts'
import { feature, scenario } from '../../tests/testSuites'
import { theChatGatewaySendMessageToPlayer } from '../../tests/unitTests/chatGateway'
import { theCleavageRepositoryHasPublicCleavages } from '../../tests/unitTests/cleavageRepository'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { EventType } from '../EventType'
import { PlayerSuggestCleavageEvent } from './PlayerSuggestCleavageEvent'

feature(EventType.PLAYER_SUGGEST_CLEAVAGE, [
    scenario('Scenario 1 : With no public cleavage', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application, []),
        application => whenEventOccurs(application, new PlayerSuggestCleavageEvent(player1, new Cleavage(cleavageTitle1, gocheChoice(), drouateChoice()))),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.THEN, application, [new Cleavage(cleavageTitle1, gocheChoice(), drouateChoice())]),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application, new MessageForPlayer(player1, cleavageSuggested(player1, cleavageTitle1)))
    ]),
    scenario('Scenario 2 : With still existing public cleavage', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application, new Cleavage(cleavageTitle1, gocheChoice(), drouateChoice())),
        application => whenEventOccurs(application, new PlayerSuggestCleavageEvent(player1, new Cleavage(cleavageTitle1, gocheChoice(), drouateChoice()))),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.THEN, application, new Cleavage(cleavageTitle1, gocheChoice(), drouateChoice())),
        application => theChatGatewaySendMessageToPlayer(Gherkin.THEN, application, new MessageForPlayer(player1, cleavageAlreadySuggested))
    ])
])
