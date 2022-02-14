import { MessageForPlayer } from '../../entities/MessageForPlayer'
import { cleavageAlreadySuggested, cleavageSuggested } from '../../entities/playerMessages'
import { Gherkin } from '../../tests/Gherkin'
import { cleavageTitle1, player1 } from '../../tests/testContexts'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { theChatGatewaySendMessageToPlayer } from '../../tests/unitTests/chatGateway'
import { theCleavageRepositoryHasPublicCleavages } from '../../tests/unitTests/cleavageRepository'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { EventType } from '../EventType'
import { PlayerSuggestCleavageEvent } from './PlayerSuggestCleavageEvent'
import { newCleavage } from '../startAutoPlay/StartAutoPlay.spec'

feature(EventType.PLAYER_SUGGEST_CLEAVAGE, [
    clientScenario('Scenario 1 : With no public cleavage', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application, []),
        application => whenEventOccurs(application, new PlayerSuggestCleavageEvent(player1, newCleavage(cleavageTitle1))),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.THEN, application, [newCleavage(cleavageTitle1)]),
        application => theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, application, new MessageForPlayer(player1, cleavageSuggested(player1, cleavageTitle1)))
    ]),
    clientScenario('Scenario 2 : With still existing public cleavage', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application, newCleavage(cleavageTitle1)),
        application => whenEventOccurs(application, new PlayerSuggestCleavageEvent(player1, newCleavage(cleavageTitle1))),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.THEN, application, newCleavage(cleavageTitle1)),
        application => theChatGatewaySendMessageToPlayer(Gherkin.THEN, application, new MessageForPlayer(player1, cleavageAlreadySuggested))
    ])
])
