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
        theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, []),
        whenEventOccurs(new PlayerSuggestCleavageEvent(player1().username, newCleavage(cleavageTitle1))),
        theCleavageRepositoryHasPublicCleavages(Gherkin.THEN, [newCleavage(cleavageTitle1)]),
        theChatGatewaySendMessageToPlayer(Gherkin.AND_THEN, new MessageForPlayer(player1().username, cleavageSuggested(player1().username, cleavageTitle1)))
    ]),
    clientScenario('Scenario 2 : With still existing public cleavage', [
        theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, newCleavage(cleavageTitle1)),
        whenEventOccurs(new PlayerSuggestCleavageEvent(player1().username, newCleavage(cleavageTitle1))),
        theCleavageRepositoryHasPublicCleavages(Gherkin.THEN, newCleavage(cleavageTitle1)),
        theChatGatewaySendMessageToPlayer(Gherkin.THEN, new MessageForPlayer(player1().username, cleavageAlreadySuggested))
    ])
])
