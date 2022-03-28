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
        app => theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, app, GamePhase.NONE),
        app => whenEventOccurs(app, new ChangeGamePhaseEvent(GamePhase.CLEAVING)),
        app => theGamePhaseRepositoryHasPhase(Gherkin.THEN, app, GamePhase.CLEAVING),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, app, []),
        app => theInterfaceGatewayHasCurrentGamePhase(Gherkin.AND_THEN, app, GamePhase.CLEAVING)
    ]),
    clientScenario(`Scenario 2 : ${GamePhase.CLEAVING} > ${GamePhase.NEW_CLEAVAGE}`, [
        app => theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, app, GamePhase.CLEAVING),
        app => whenEventOccurs(app, new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE)),
        app => theGamePhaseRepositoryHasPhase(Gherkin.THEN, app, GamePhase.NEW_CLEAVAGE),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, app, new Sound(SupportedSound.POUFFF)),
        app => theInterfaceGatewayHasCurrentGamePhase(Gherkin.AND_THEN, app, GamePhase.NEW_CLEAVAGE)
    ]),
    clientScenario(`Scenario 3 : ${GamePhase.NEW_CLEAVAGE} > ${GamePhase.CLEAVING}`, [
        app => theGamePhaseRepositoryHasPhase(Gherkin.GIVEN, app, GamePhase.NEW_CLEAVAGE),
        app => whenEventOccurs(app, new ChangeGamePhaseEvent(GamePhase.CLEAVING)),
        app => theGamePhaseRepositoryHasPhase(Gherkin.THEN, app, GamePhase.CLEAVING),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, app, new Sound(SupportedSound.POUFFF)),
        app => theInterfaceGatewayHasCurrentGamePhase(Gherkin.AND_THEN, app, GamePhase.CLEAVING)
    ])
])
