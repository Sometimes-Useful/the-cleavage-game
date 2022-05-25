import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { EventType } from '../EventType'
import { ChangeGamePhaseEvent } from './ChangeGamePhaseEvent'
import { GamePhase } from '../../entities/GamePhase'
import { theGamePhaseRepositoryHasPhase } from '../../tests/unitTests/gamePhaseRepository'
import { Gherkin } from '../../tests/Gherkin'
import { theInterfaceGatewayHasCurrentGamePhase, theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'

feature(EventType.CHANGE_GAME_PHASE, [
    clientScenario(`Scenario 1 : ${GamePhase.NONE} > ${GamePhase.CLEAVING}`, [
        theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, GamePhase.NONE),
        whenEventOccurs(new ChangeGamePhaseEvent(GamePhase.CLEAVING)),
        theGamePhaseRepositoryHasPhase(Gherkin.THEN, GamePhase.CLEAVING),
        theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, []),
        theInterfaceGatewayHasCurrentGamePhase(Gherkin.AND_THEN, GamePhase.CLEAVING)
    ]),
    clientScenario(`Scenario 2 : ${GamePhase.CLEAVING} > ${GamePhase.NEW_CLEAVAGE}`, [
        theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, GamePhase.CLEAVING),
        whenEventOccurs(new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE)),
        theGamePhaseRepositoryHasPhase(Gherkin.THEN, GamePhase.NEW_CLEAVAGE),
        theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, new Sound(SupportedSound.POUFFF)),
        theInterfaceGatewayHasCurrentGamePhase(Gherkin.AND_THEN, GamePhase.NEW_CLEAVAGE)
    ]),
    clientScenario(`Scenario 3 : ${GamePhase.NEW_CLEAVAGE} > ${GamePhase.CLEAVING}`, [
        theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, GamePhase.NEW_CLEAVAGE),
        whenEventOccurs(new ChangeGamePhaseEvent(GamePhase.CLEAVING)),
        theGamePhaseRepositoryHasPhase(Gherkin.THEN, GamePhase.CLEAVING),
        theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, new Sound(SupportedSound.POUFFF)),
        theInterfaceGatewayHasCurrentGamePhase(Gherkin.AND_THEN, GamePhase.CLEAVING)
    ])
])
