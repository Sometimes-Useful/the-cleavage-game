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
        app => theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN, app),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username] }, rightChoice: { name: 'Non', players: [] }, players: [player1().username] })),
        app => theVideoExtractRepositoryHasNoExtracts(Gherkin.AND_GIVEN, app),
        app => whenEventOccurs(app, new VideoExtractStartEvent()),
        app => theEventIsSent(Gherkin.THEN, app, new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE)),
        app => theInterfaceGatewayHasNoCurrentVideo(Gherkin.AND_THEN, app)
    ]),
    clientScenario('Scenario 2 : No video extract for choices and auto play.', [
        app => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, app, new Date()),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username] }, rightChoice: { name: 'Non', players: [] }, players: [player1().username] })),
        app => theVideoExtractRepositoryHasNoExtracts(Gherkin.AND_GIVEN, app),
        app => whenEventOccurs(app, new VideoExtractStartEvent()),
        app => theEventIsSent(Gherkin.THEN, app, [
            new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE),
            new DrawCleavageEvent()
        ]),
        app => theInterfaceGatewayHasNoCurrentVideo(Gherkin.AND_THEN, app)
    ]),
    clientScenario('Scenario 3 : Full Video extract "pAy3-A_VWRY" for choices 1 player on "Oui" and 0 player on "Non', [
        app => theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN, app),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username] }, rightChoice: { name: 'Non', players: [] }, players: [player1().username] })),
        app => theVideoExtractRepositoryHasExtracts(Gherkin.AND_GIVEN, app, [oui100VideoExtract, non100VideoExtract]),
        app => whenEventOccurs(app, new VideoExtractStartEvent()),
        app => theEventIsSent(Gherkin.THEN, app, new ChangeGamePhaseEvent(GamePhase.PLAY_VIDEO)),
        app => theInterfaceGatewayHasCurrentVideo(Gherkin.AND_THEN, app, oui100VideoExtract)
    ]),
    clientScenario('Scenario 4 : Full Video extract "pAy3-A_VWRY" for choices 0 player on "Oui" and 1 player on "Non', [
        app => theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN, app),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [] }, rightChoice: { name: 'Non', players: [player1().username] }, players: [player1().username] })),
        app => theVideoExtractRepositoryHasExtracts(Gherkin.AND_GIVEN, app, [oui100VideoExtract, non100VideoExtract]),
        app => whenEventOccurs(app, new VideoExtractStartEvent()),
        app => theEventIsSent(Gherkin.THEN, app, new ChangeGamePhaseEvent(GamePhase.PLAY_VIDEO)),
        app => theInterfaceGatewayHasCurrentVideo(Gherkin.AND_THEN, app, non100VideoExtract)
    ]),
    clientScenario(`Scenario 5 : Full Video extract "${oui60VideoExtract.youtubeVideoId}" for choices 3 player on "Oui" and 1 player on "Non`, [
        app => theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN, app),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username, player2().username, player3().username] }, rightChoice: { name: 'Non', players: [player4().username] }, players: [player1().username, player2().username, player3().username, player4().username] })),
        app => theVideoExtractRepositoryHasExtracts(Gherkin.AND_GIVEN, app, [oui100VideoExtract, oui60VideoExtract, non100VideoExtract]),
        app => whenEventOccurs(app, new VideoExtractStartEvent()),
        app => theEventIsSent(Gherkin.THEN, app, new ChangeGamePhaseEvent(GamePhase.PLAY_VIDEO)),
        app => theInterfaceGatewayHasCurrentVideo(Gherkin.AND_THEN, app, oui60VideoExtract)
    ]),
    clientScenario(`Scenario 6 : Full Video extract "${egalite50VideoExtract.youtubeVideoId}" for choices 2 player on "Oui" and 2 player on "Non`, [
        app => theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN, app),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username, player2().username] }, rightChoice: { name: 'Non', players: [player3().username, player4().username] }, players: [player1().username, player2().username, player3().username, player4().username] })),
        app => theVideoExtractRepositoryHasExtracts(Gherkin.AND_GIVEN, app, [oui100VideoExtract, oui60VideoExtract, non100VideoExtract, egalite50VideoExtract, egalite50VideoExtract2]),
        app => whenEventOccurs(app, new VideoExtractStartEvent()),
        app => theEventIsSent(Gherkin.THEN, app, new ChangeGamePhaseEvent(GamePhase.PLAY_VIDEO)),
        app => theInterfaceGatewayHasCurrentVideo(Gherkin.AND_THEN, app, egalite50VideoExtract)
    ]),
    clientScenario(`Scenario 7 : Full Video extract "${egalite50VideoExtract2.youtubeVideoId}" for choices 2 player on "Oui" and 2 player on "Non`, [
        app => theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN, app),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username, player2().username] }, rightChoice: { name: 'Non', players: [player3().username, player4().username] }, players: [player1().username, player2().username, player3().username, player4().username] })),
        app => theVideoExtractRepositoryHasExtracts(Gherkin.AND_GIVEN, app, [oui100VideoExtract, oui60VideoExtract, non100VideoExtract, egalite50VideoExtract2, egalite50VideoExtract]),
        app => whenEventOccurs(app, new VideoExtractStartEvent()),
        app => theEventIsSent(Gherkin.THEN, app, new ChangeGamePhaseEvent(GamePhase.PLAY_VIDEO)),
        app => theInterfaceGatewayHasCurrentVideo(Gherkin.AND_THEN, app, egalite50VideoExtract2)
    ]),
    clientScenario('Scenario 8 : Video extract for choices and auto play.', [
        app => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, app, new Date()),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username] }, rightChoice: { name: 'Non', players: [] }, players: [player1().username] })),
        app => theVideoExtractRepositoryHasExtracts(Gherkin.AND_GIVEN, app, [oui100VideoExtract]),
        app => whenEventOccurs(app, new VideoExtractStartEvent()),
        app => theEventIsSent(Gherkin.THEN, app, [
            new ChangeGamePhaseEvent(GamePhase.PLAY_VIDEO)
        ]),
        app => theInterfaceGatewayHasCurrentVideo(Gherkin.AND_THEN, app, oui100VideoExtract)
    ]),
    clientScenario('Scenario 9 : Mute Music', [
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_GIVEN, app, new Cleavage({ title: 'Billy', leftChoice: { name: 'Oui', players: [player1().username] }, rightChoice: { name: 'Non', players: [] }, players: [player1().username] })),
        app => theVideoExtractRepositoryHasExtracts(Gherkin.AND_GIVEN, app, [oui100VideoExtract]),
        app => theInterfaceGatewayHasCurrentMusicNotMuted(Gherkin.AND_GIVEN, app),
        app => whenEventOccurs(app, new VideoExtractStartEvent()),
        app => theEventIsSent(Gherkin.THEN, app, [
            new ChangeGamePhaseEvent(GamePhase.PLAY_VIDEO)
        ]),
        app => theInterfaceGatewayHasCurrentMusicMuted(Gherkin.THEN, app),
        app => theInterfaceGatewayHasCurrentVideo(Gherkin.AND_THEN, app, oui100VideoExtract)
    ])
])
