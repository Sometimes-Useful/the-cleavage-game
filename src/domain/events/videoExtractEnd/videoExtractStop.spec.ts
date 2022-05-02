
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
        theInterfaceGatewayHasCurrentVideo(Gherkin.GIVEN, oui100VideoExtract),
        theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.AND_GIVEN),
        whenEventOccurs(new VideoExtractStopEvent()),
        theInterfaceGatewayHasNoCurrentVideo(Gherkin.THEN),
        theEventIsSent(Gherkin.AND_THEN, new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE))
    ]),
    clientScenario('Scenario 2 : auto play.', [
        theInterfaceGatewayHasCurrentVideo(Gherkin.GIVEN, oui100VideoExtract),
        theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, new Date()),
        whenEventOccurs(new VideoExtractStopEvent()),
        theInterfaceGatewayHasNoCurrentVideo(Gherkin.THEN),
        theEventIsSent(Gherkin.AND_THEN, [
            new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE),
            new DrawCleavageEvent()
        ])
    ]),
    clientScenario('Scenario 3 :Unmute music', [
        theInterfaceGatewayHasCurrentVideo(Gherkin.GIVEN, oui100VideoExtract),
        theInterfaceGatewayHasCurrentMusicMuted(Gherkin.AND_GIVEN),
        whenEventOccurs(new VideoExtractStopEvent()),
        theInterfaceGatewayHasNoCurrentVideo(Gherkin.THEN),
        theInterfaceGatewayHasCurrentMusicNotMuted(Gherkin.AND_THEN),
        theEventIsSent(Gherkin.AND_THEN, new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE))
    ])
])
