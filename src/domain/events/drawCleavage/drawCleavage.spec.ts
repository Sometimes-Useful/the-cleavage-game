import { noCleavageAvailableNotification } from '../../entities/notification/notifications'
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { cleavage1, cleavage2 } from '../../tests/testContexts'
import { theAutoPlayRepositoryDontHaveNextCleavageDate, theAutoPlayRepositoryHasNextCleavageDate } from '../../tests/unitTests/autoplayRepository'
import { theCleavageRepositoryHasPublicCleavages, theCurrentCleavageRepositoryHasCleavage, theGlobalCleavageDrawPileGatewayDontHaveCleavages, theGlobalCleavageDrawPileGatewayHasCleavages } from '../../tests/unitTests/cleavageRepository'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayDontHaveCleavage, theInterfaceGatewayHasCurrentCleavage, theInterfaceGatewayHasNotifications, theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { LaunchCleavageEvent } from '../launchCleavage/LaunchCleavageEvent'
import { DrawCleavageEvent } from './DrawCleavageEvent'

feature(EventType.DRAW_CLEAVAGE, [
    clientScenario('Scenario 1 : With one public cleavage and without autoplay', [
        theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, [cleavage1]),
        theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.AND_GIVEN),
        whenEventOccurs(new DrawCleavageEvent()),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.THEN, cleavage1),
        theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, []),
        theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, [new Sound(SupportedSound.DICE_ROLL)]),
        theEventIsSent(Gherkin.AND_THEN, [])
    ]),
    clientScenario('Scenario 2 : With two public cleavages', [
        theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, [cleavage1, cleavage2]),
        whenEventOccurs(new DrawCleavageEvent()),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.THEN, cleavage1),
        theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, [cleavage2]),
        theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, [new Sound(SupportedSound.DICE_ROLL)]),
        theEventIsSent(Gherkin.AND_THEN, [])
    ]),
    clientScenario('Scenario 3 : No public cleavages and no global cleavage', [
        theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, []),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, cleavage1),
        theGlobalCleavageDrawPileGatewayDontHaveCleavages(Gherkin.AND_GIVEN),
        whenEventOccurs(new DrawCleavageEvent()),
        theInterfaceGatewayDontHaveCleavage(Gherkin.THEN),
        theInterfaceGatewayHasNotifications(Gherkin.AND_THEN, noCleavageAvailableNotification),
        theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, []),
        theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, [new Sound(SupportedSound.ERROR)]),
        theEventIsSent(Gherkin.AND_THEN, [])
    ]),
    clientScenario('Scenario 4 : No public cleavages and one global cleavage', [
        theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, []),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, cleavage1),
        theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.AND_GIVEN, cleavage2),
        whenEventOccurs(new DrawCleavageEvent()),
        theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.THEN, cleavage2),
        theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, []),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.AND_THEN, cleavage2),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, cleavage2),
        theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, [new Sound(SupportedSound.DICE_ROLL)]),
        theEventIsSent(Gherkin.AND_THEN, [])
    ]),
    clientScenario('Scenario 5 : Launch global cleavage on autoplay with public cleavage', [
        theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, cleavage1),
        theAutoPlayRepositoryHasNextCleavageDate(Gherkin.AND_GIVEN, new Date()),
        theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.AND_GIVEN, cleavage2),
        whenEventOccurs(new DrawCleavageEvent()),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, cleavage2),
        theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, cleavage1),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, cleavage2),
        theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, [new Sound(SupportedSound.DICE_ROLL)]),
        theEventIsSent(Gherkin.AND_THEN, new LaunchCleavageEvent(cleavage2.title, cleavage2.leftChoice.name, cleavage2.rightChoice.name))
    ]),
    clientScenario("Scenario 6 : Don't Launch cleavage when there is no autoplay date", [
        theAutoPlayRepositoryDontHaveNextCleavageDate(Gherkin.GIVEN),
        theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.AND_GIVEN, cleavage2),
        whenEventOccurs(new DrawCleavageEvent()),
        theCurrentCleavageRepositoryHasCleavage(Gherkin.THEN, cleavage2),
        theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_THEN, cleavage2),
        theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, [new Sound(SupportedSound.DICE_ROLL)]),
        theEventIsSent(Gherkin.AND_THEN, [])
    ])
])
