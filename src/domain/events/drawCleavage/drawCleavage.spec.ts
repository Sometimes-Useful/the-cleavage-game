import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { theInterfaceGatewayDontHaveCleavage, theInterfaceGatewayHasCurrentCleavage, theInterfaceGatewayHasNotifications, theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { Gherkin } from '../../tests/Gherkin'
import { cleavageTitle1, cleavageTitle2 } from '../../tests/testContexts'
import { DrawCleavageEvent } from './DrawCleavageEvent'
import { Cleavage } from '../../entities/Cleavage'
import { noCleavageAvailableNotification } from '../../entities/notification/notifications'
import { EventType } from '../EventType'
import { theCleavageRepositoryHasPublicCleavages, theCurrentCleavageRepositoryHasCleavage, theGlobalCleavageDrawPileGatewayDontHaveCleavages, theGlobalCleavageDrawPileGatewayHasCleavages } from '../../tests/unitTests/cleavageRepository'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'
import { theAutoPlayRepositoryDontHaveNextCleavageDate, theAutoPlayRepositoryHasNextCleavageDate } from '../../tests/unitTests/autoplayRepository'
import { LaunchCleavageEvent } from '../launchCleavage/LaunchCleavageEvent'

const cleavage1 = new Cleavage({ title: cleavageTitle1, leftChoice: { name: 'Gôche', players: [] }, rightChoice: { name: 'Drouate', players: [] }, players: [] })
const cleavage2 = new Cleavage({ title: cleavageTitle2, leftChoice: { name: 'Gôche', players: [] }, rightChoice: { name: 'Drouate', players: [] }, players: [] })
feature(EventType.DRAW_CLEAVAGE, [
    clientScenario('Scenario 1 : With one public cleavage', [
        app => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, app, [cleavage1]),
        app => whenEventOccurs(app, new DrawCleavageEvent()),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.THEN, app, cleavage1),
        app => theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, app, []),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, app, [new Sound(SupportedSound.DICE_ROLL)]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [])
    ]),
    clientScenario('Scenario 2 : With two public cleavages', [
        app => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, app, [cleavage1, cleavage2]),
        app => whenEventOccurs(app, new DrawCleavageEvent()),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.THEN, app, cleavage1),
        app => theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, app, [cleavage2]),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, app, [new Sound(SupportedSound.DICE_ROLL)]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [])
    ]),
    clientScenario('Scenario 3 : No public cleavages and no global cleavage', [
        app => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, app, []),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, app, cleavage1),
        app => theGlobalCleavageDrawPileGatewayDontHaveCleavages(Gherkin.AND_GIVEN, app),
        app => whenEventOccurs(app, new DrawCleavageEvent()),
        app => theInterfaceGatewayDontHaveCleavage(Gherkin.THEN, app),
        app => theInterfaceGatewayHasNotifications(Gherkin.AND_THEN, app, noCleavageAvailableNotification),
        app => theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, app, []),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, app, [new Sound(SupportedSound.ERROR)]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [])
    ]),
    clientScenario('Scenario 4 : No public cleavages and one global cleavage', [
        app => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, app, []),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, app, cleavage1),
        app => theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.AND_GIVEN, app, cleavage2),
        app => whenEventOccurs(app, new DrawCleavageEvent()),
        app => theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.THEN, app, cleavage2),
        app => theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, app, []),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, app, cleavage2),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, app, cleavage2),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, app, [new Sound(SupportedSound.DICE_ROLL)]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [])
    ]),
    clientScenario('Scenario 5 : Launch cleavage on autoplay', [
        app => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.GIVEN, app, new Date()),
        app => theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.AND_GIVEN, app, cleavage2),
        app => whenEventOccurs(app, new DrawCleavageEvent()),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, app, cleavage2),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, app, cleavage2),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, app, [new Sound(SupportedSound.DICE_ROLL)]),
        app => theEventIsSent(Gherkin.AND_THEN, app, new LaunchCleavageEvent(cleavage2.title, cleavage2.leftChoice.name, cleavage2.rightChoice.name))
    ]),
    clientScenario("Scenario 6 : Don't Launch cleavage when there is no autoplay date", [
        app => theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN, app),
        app => theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.AND_GIVEN, app, cleavage2),
        app => whenEventOccurs(app, new DrawCleavageEvent()),
        app => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, app, cleavage2),
        app => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, app, cleavage2),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, app, [new Sound(SupportedSound.DICE_ROLL)]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [])
    ])
])
