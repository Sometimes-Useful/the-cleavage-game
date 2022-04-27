
import { GamePhase } from '../../entities/GamePhase'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { oui100VideoExtract } from '../../tests/testContexts'
import { theAutoPlayRepositoryDontHaveNextCleavageDate, theAutoPlayRepositoryHasNextCleavageDate } from '../../tests/unitTests/autoplayRepository'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayHasCurrentMusicMuted, theInterfaceGatewayHasCurrentMusicNotMuted, theInterfaceGatewayHasCurrentVideo, theInterfaceGatewayHasNoCurrentVideo } from '../../tests/unitTests/interfaceGateway'
import { ChangeGamePhaseEvent } from '../changeGamePhase/ChangeGamePhaseEvent'
import { DrawCleavageEvent } from '../drawCleavage/DrawCleavageEvent'
import { EventType } from '../EventType'
import { VideoExtractStopEvent } from './VideoExtractStopEvent'

feature(EventType.VIDEO_EXTRACT_STOP, [
    clientScenario('Scenario 1 : No auto play', [
        app => theInterfaceGatewayHasCurrentVideo(Gherkin.GIVEN, app, oui100VideoExtract),
        app => theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.AND_GIVEN, app),
        app => whenEventOccurs(app, new VideoExtractStopEvent()),
        app => theInterfaceGatewayHasNoCurrentVideo(Gherkin.THEN, app),
        app => theEventIsSent(Gherkin.AND_THEN, app, new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE))
    ]),
    clientScenario('Scenario 2 : auto play.', [
        app => theInterfaceGatewayHasCurrentVideo(Gherkin.GIVEN, app, oui100VideoExtract),
        app => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, app, new Date()),
        app => whenEventOccurs(app, new VideoExtractStopEvent()),
        app => theInterfaceGatewayHasNoCurrentVideo(Gherkin.THEN, app),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE),
            new DrawCleavageEvent()
        ])
    ]),
    clientScenario('Scenario 3 :Unmute music', [
        app => theInterfaceGatewayHasCurrentVideo(Gherkin.GIVEN, app, oui100VideoExtract),
        app => theInterfaceGatewayHasCurrentMusicMuted(Gherkin.AND_GIVEN, app),
        app => whenEventOccurs(app, new VideoExtractStopEvent()),
        app => theInterfaceGatewayHasNoCurrentVideo(Gherkin.THEN, app),
        app => theInterfaceGatewayHasCurrentMusicNotMuted(Gherkin.AND_THEN, app),
        app => theEventIsSent(Gherkin.AND_THEN, app, new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE))
    ])
])
