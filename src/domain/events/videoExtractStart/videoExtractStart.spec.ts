import { Cleavage } from '../../entities/Cleavage'
import { GamePhase } from '../../entities/GamePhase'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { egalite50VideoExtract, egalite50VideoExtract2, non100VideoExtract, oui100VideoExtract, oui60VideoExtract, player1, player2, player3, player4 } from '../../tests/testContexts'
import { theAutoPlayRepositoryDontHaveNextCleavageDate, theAutoPlayRepositoryHasNextCleavageDate } from '../../tests/unitTests/autoplayRepository'
import { theCurrentCleavageRepositoryHasCleavage } from '../../tests/unitTests/cleavageRepository'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayHasCurrentMusicMuted, theInterfaceGatewayHasCurrentMusicNotMuted, theInterfaceGatewayHasCurrentVideo, theInterfaceGatewayHasNoCurrentVideo } from '../../tests/unitTests/interfaceGateway'
import { theVideoExtractRepositoryHasExtracts, theVideoExtractRepositoryHasNoExtracts } from '../../tests/unitTests/videoExtractRepository'
import { ChangeGamePhaseEvent } from '../changeGamePhase/ChangeGamePhaseEvent'
import { DrawCleavageEvent } from '../drawCleavage/DrawCleavageEvent'
import { EventType } from '../EventType'
import { VideoExtractStartEvent } from './VideoExtractStartEvent'

feature(EventType.VIDEO_EXTRACT_START, [
    clientScenario('Scenario 1 : No video extract for choices and no auto play.', [
        theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username] }, rightChoice: { name: 'Non', players: [] }, players: [player1().username] })),
        theVideoExtractRepositoryHasNoExtracts(Gherkin.AND_GIVEN),
        whenEventOccurs(new VideoExtractStartEvent()),
        theEventIsSent(Gherkin.THEN, new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE)),
        theInterfaceGatewayHasNoCurrentVideo(Gherkin.AND_THEN)
    ]),
    clientScenario('Scenario 2 : No video extract for choices and auto play.', [
        theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, new Date()),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username] }, rightChoice: { name: 'Non', players: [] }, players: [player1().username] })),
        theVideoExtractRepositoryHasNoExtracts(Gherkin.AND_GIVEN),
        whenEventOccurs(new VideoExtractStartEvent()),
        theEventIsSent(Gherkin.THEN, [
            new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE),
            new DrawCleavageEvent()
        ]),
        theInterfaceGatewayHasNoCurrentVideo(Gherkin.AND_THEN)
    ]),
    clientScenario('Scenario 3 : Full Video extract "pAy3-A_VWRY" for choices 1 player on "Oui" and 0 player on "Non', [
        theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username] }, rightChoice: { name: 'Non', players: [] }, players: [player1().username] })),
        theVideoExtractRepositoryHasExtracts(Gherkin.AND_GIVEN, [oui100VideoExtract, non100VideoExtract]),
        whenEventOccurs(new VideoExtractStartEvent()),
        theEventIsSent(Gherkin.THEN, new ChangeGamePhaseEvent(GamePhase.PLAY_VIDEO)),
        theInterfaceGatewayHasCurrentVideo(Gherkin.AND_THEN, oui100VideoExtract)
    ]),
    clientScenario('Scenario 4 : Full Video extract "pAy3-A_VWRY" for choices 0 player on "Oui" and 1 player on "Non', [
        theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [] }, rightChoice: { name: 'Non', players: [player1().username] }, players: [player1().username] })),
        theVideoExtractRepositoryHasExtracts(Gherkin.AND_GIVEN, [oui100VideoExtract, non100VideoExtract]),
        whenEventOccurs(new VideoExtractStartEvent()),
        theEventIsSent(Gherkin.THEN, new ChangeGamePhaseEvent(GamePhase.PLAY_VIDEO)),
        theInterfaceGatewayHasCurrentVideo(Gherkin.AND_THEN, non100VideoExtract)
    ]),
    clientScenario(`Scenario 5 : Full Video extract "${oui60VideoExtract.youtubeVideoId}" for choices 3 player on "Oui" and 1 player on "Non`, [
        theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username, player2().username, player3().username] }, rightChoice: { name: 'Non', players: [player4().username] }, players: [player1().username, player2().username, player3().username, player4().username] })),
        theVideoExtractRepositoryHasExtracts(Gherkin.AND_GIVEN, [oui100VideoExtract, oui60VideoExtract, non100VideoExtract]),
        whenEventOccurs(new VideoExtractStartEvent()),
        theEventIsSent(Gherkin.THEN, new ChangeGamePhaseEvent(GamePhase.PLAY_VIDEO)),
        theInterfaceGatewayHasCurrentVideo(Gherkin.AND_THEN, oui60VideoExtract)
    ]),
    clientScenario(`Scenario 6 : Full Video extract "${egalite50VideoExtract.youtubeVideoId}" for choices 2 player on "Oui" and 2 player on "Non`, [
        theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username, player2().username] }, rightChoice: { name: 'Non', players: [player3().username, player4().username] }, players: [player1().username, player2().username, player3().username, player4().username] })),
        theVideoExtractRepositoryHasExtracts(Gherkin.AND_GIVEN, [oui100VideoExtract, oui60VideoExtract, non100VideoExtract, egalite50VideoExtract, egalite50VideoExtract2]),
        whenEventOccurs(new VideoExtractStartEvent()),
        theEventIsSent(Gherkin.THEN, new ChangeGamePhaseEvent(GamePhase.PLAY_VIDEO)),
        theInterfaceGatewayHasCurrentVideo(Gherkin.AND_THEN, egalite50VideoExtract)
    ]),
    clientScenario(`Scenario 7 : Full Video extract "${egalite50VideoExtract2.youtubeVideoId}" for choices 2 player on "Oui" and 2 player on "Non`, [
        theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username, player2().username] }, rightChoice: { name: 'Non', players: [player3().username, player4().username] }, players: [player1().username, player2().username, player3().username, player4().username] })),
        theVideoExtractRepositoryHasExtracts(Gherkin.AND_GIVEN, [oui100VideoExtract, oui60VideoExtract, non100VideoExtract, egalite50VideoExtract2, egalite50VideoExtract]),
        whenEventOccurs(new VideoExtractStartEvent()),
        theEventIsSent(Gherkin.THEN, new ChangeGamePhaseEvent(GamePhase.PLAY_VIDEO)),
        theInterfaceGatewayHasCurrentVideo(Gherkin.AND_THEN, egalite50VideoExtract2)
    ]),
    clientScenario('Scenario 8 : Video extract for choices and auto play.', [
        theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, new Date()),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username] }, rightChoice: { name: 'Non', players: [] }, players: [player1().username] })),
        theVideoExtractRepositoryHasExtracts(Gherkin.AND_GIVEN, [oui100VideoExtract]),
        whenEventOccurs(new VideoExtractStartEvent()),
        theEventIsSent(Gherkin.THEN, [
            new ChangeGamePhaseEvent(GamePhase.PLAY_VIDEO)
        ]),
        theInterfaceGatewayHasCurrentVideo(Gherkin.AND_THEN, oui100VideoExtract)
    ]),
    clientScenario('Scenario 9 : Mute Music', [
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username] }, rightChoice: { name: 'Non', players: [] }, players: [player1().username] })),
        theVideoExtractRepositoryHasExtracts(Gherkin.AND_GIVEN, [oui100VideoExtract]),
        theInterfaceGatewayHasCurrentMusicNotMuted(Gherkin.AND_GIVEN),
        whenEventOccurs(new VideoExtractStartEvent()),
        theEventIsSent(Gherkin.THEN, [
            new ChangeGamePhaseEvent(GamePhase.PLAY_VIDEO)
        ]),
        theInterfaceGatewayHasCurrentMusicMuted(Gherkin.THEN),
        theInterfaceGatewayHasCurrentVideo(Gherkin.AND_THEN, oui100VideoExtract)
    ]),
    clientScenario('Scenario 7 BUG : player 100% "gôche" play different extract with available extract 100/90/80/55 for "gôche" choice', [
        theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, new Cleavage({ title: 'Billy', leftChoice: { name: 'Gôche', players: [player1().username] }, rightChoice: { name: 'Non', players: [] }, players: [player1().username, player2().username, player3().username] })),
        theVideoExtractRepositoryHasExtracts(Gherkin.AND_GIVEN, [
            { choice: 'Gôche', percentage: 100, youtubeVideoId: '6Q5-qVUMqfQ' },
            { choice: 'Gôche', percentage: 90, youtubeVideoId: 'zRunanIYOp4', startExtractSeconds: 0, endExtractSeconds: 8 },
            { choice: 'Gôche', percentage: 80, youtubeVideoId: 'BJFPfTNwILo', startExtractSeconds: 68.2, endExtractSeconds: 79.8 },
            { choice: 'Gôche', percentage: 55, youtubeVideoId: 'Fi1RkSesW-g', startExtractSeconds: 45.3, endExtractSeconds: 58.8 }
        ]),
        whenEventOccurs(new VideoExtractStartEvent()),
        theEventIsSent(Gherkin.THEN, new ChangeGamePhaseEvent(GamePhase.PLAY_VIDEO)),
        theInterfaceGatewayHasCurrentVideo(Gherkin.AND_THEN, { choice: 'Gôche', percentage: 100, youtubeVideoId: '6Q5-qVUMqfQ' })
    ])
])
