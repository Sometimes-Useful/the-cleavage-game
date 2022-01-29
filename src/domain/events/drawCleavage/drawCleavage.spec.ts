import { feature, scenario } from '../../tests/testSuites'
import { theInterfaceGatewayDontHaveCleavage, theInterfaceGatewayHasCurrentCleavage, theInterfaceGatewayHasNotifications, theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { Gherkin } from '../../tests/Gherkin'
import { cleavageTitle1, cleavageTitle2 } from '../../tests/testContexts'
import { DrawCleavageEvent } from './DrawCleavageEvent'
import { Cleavage } from '../../entities/Cleavage'
import { noPublicCleavageNotification } from '../../entities/notification/notifications'
import { EventType } from '../EventType'
import { theCleavageRepositoryHasPublicCleavages, theGlobalCleavageDrawPileRepositoryDontHaveCleavages, theGlobalCleavageDrawPileRepositoryHasCleavages } from '../../tests/unitTests/cleavageRepository'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'

feature(EventType.DRAW_CLEAVAGE, [
    scenario('Scenario 1 : With one public cleavage', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application, [new Cleavage(cleavageTitle1)]),
        application => whenEventOccurs(application, new DrawCleavageEvent()),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.THEN, application, new Cleavage(cleavageTitle1)),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, application, []),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, application, [new Sound(SupportedSound.DICE_ROLL)])
    ]),
    scenario('Scenario 2 : With two public cleavages', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application, [new Cleavage(cleavageTitle1), new Cleavage(cleavageTitle2)]),
        application => whenEventOccurs(application, new DrawCleavageEvent()),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.THEN, application, new Cleavage(cleavageTitle1)),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, application, [new Cleavage(cleavageTitle2)]),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, application, [new Sound(SupportedSound.DICE_ROLL)])
    ]),
    scenario('Scenario 3 : No public cleavages and no global cleavage', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application, []),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, application, new Cleavage(cleavageTitle1)),
        application => theGlobalCleavageDrawPileRepositoryDontHaveCleavages(Gherkin.AND_GIVEN, application),
        application => whenEventOccurs(application, new DrawCleavageEvent()),
        application => theInterfaceGatewayDontHaveCleavage(Gherkin.THEN, application),
        application => theInterfaceGatewayHasNotifications(Gherkin.AND_THEN, application, noPublicCleavageNotification),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, application, []),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, application, [new Sound(SupportedSound.ERROR)])
    ]),
    scenario('Scenario 4 : No public cleavages and one global cleavage', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application, []),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, application, new Cleavage(cleavageTitle1)),
        application => theGlobalCleavageDrawPileRepositoryHasCleavages(Gherkin.AND_GIVEN, application, new Cleavage(cleavageTitle2)),
        application => whenEventOccurs(application, new DrawCleavageEvent()),
        application => theGlobalCleavageDrawPileRepositoryHasCleavages(Gherkin.THEN, application, new Cleavage(cleavageTitle2)),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, application, []),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.THEN, application, new Cleavage(cleavageTitle2)),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, application, [new Sound(SupportedSound.DICE_ROLL)])
    ])
])
