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

const cleavage1 = new Cleavage(cleavageTitle1, { name: 'Gôche', players: [] }, { name: 'Drouate', players: [] })
const cleavage2 = new Cleavage(cleavageTitle2, { name: 'Gôche', players: [] }, { name: 'Drouate', players: [] })
feature(EventType.DRAW_CLEAVAGE, [
    clientScenario('Scenario 1 : With one public cleavage', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application, [cleavage1]),
        application => whenEventOccurs(application, new DrawCleavageEvent()),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.THEN, application, cleavage1),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, application, []),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, application, [new Sound(SupportedSound.DICE_ROLL)]),
        application => theEventIsSent(Gherkin.AND_THEN, application, [])
    ]),
    clientScenario('Scenario 2 : With two public cleavages', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application, [cleavage1, cleavage2]),
        application => whenEventOccurs(application, new DrawCleavageEvent()),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.THEN, application, cleavage1),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, application, [cleavage2]),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, application, [new Sound(SupportedSound.DICE_ROLL)]),
        application => theEventIsSent(Gherkin.AND_THEN, application, [])
    ]),
    clientScenario('Scenario 3 : No public cleavages and no global cleavage', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application, []),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, application, cleavage1),
        application => theGlobalCleavageDrawPileGatewayDontHaveCleavages(Gherkin.AND_GIVEN, application),
        application => whenEventOccurs(application, new DrawCleavageEvent()),
        application => theInterfaceGatewayDontHaveCleavage(Gherkin.THEN, application),
        application => theInterfaceGatewayHasNotifications(Gherkin.AND_THEN, application, noCleavageAvailableNotification),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, application, []),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, application, [new Sound(SupportedSound.ERROR)]),
        application => theEventIsSent(Gherkin.AND_THEN, application, [])
    ]),
    clientScenario('Scenario 4 : No public cleavages and one global cleavage', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application, []),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, application, cleavage1),
        application => theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.AND_GIVEN, application, cleavage2),
        application => whenEventOccurs(application, new DrawCleavageEvent()),
        application => theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.THEN, application, cleavage2),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, application, []),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, application, cleavage2),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, cleavage2),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, application, [new Sound(SupportedSound.DICE_ROLL)]),
        application => theEventIsSent(Gherkin.AND_THEN, application, [])
    ]),
    clientScenario('Scenario 5 : Launch cleavage on autoplay', [
        application => theAutoPlayRepositoryHasNextCleavageDate(Gherkin.GIVEN, application, new Date()),
        application => theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.AND_GIVEN, application, cleavage2),
        application => whenEventOccurs(application, new DrawCleavageEvent()),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, cleavage2),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, cleavage2),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, application, [new Sound(SupportedSound.DICE_ROLL)]),
        application => theEventIsSent(Gherkin.AND_THEN, application, new LaunchCleavageEvent(cleavage2.title, cleavage2.leftChoice.name, cleavage2.rightChoice.name))
    ]),
    clientScenario("Scenario 6 : Don't Launch cleavage when there is no autoplay date", [
        application => theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN, application),
        application => theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.AND_GIVEN, application, cleavage2),
        application => whenEventOccurs(application, new DrawCleavageEvent()),
        application => theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, application, cleavage2),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, application, cleavage2),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, application, [new Sound(SupportedSound.DICE_ROLL)]),
        application => theEventIsSent(Gherkin.AND_THEN, application, [])
    ])
])
