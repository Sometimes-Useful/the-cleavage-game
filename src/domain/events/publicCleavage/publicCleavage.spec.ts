import { feature, scenario } from '../../tests/testSuites'
import { theCleavageRepositoryHasPublicCleavages, theInterfaceGatewayDontHaveCleavage, theInterfaceGatewayHasCurrentCleavage, theInterfaceGatewayHasNotifications, theInterfaceGatewayHasPlayingSounds, whenEventOccurs } from '../../tests/unitTests'
import { Gherkin } from '../../tests/Gherkin'
import { cleavageTitle1, cleavageTitle2 } from '../../tests/testContexts'
import { PublicCleavageEvent } from './PublicCleavageEvent'
import { Cleavage } from '../../entities/Cleavage'
import { noPublicCleavageNotification } from '../../entities/notification/notifications'
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../ports/SoundType'
import { EventType } from '../EventType'

feature(EventType.PUBLIC_CLEAVAGE, [
    scenario('Scenario 1 : With one public cleavage', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application.repositories.cleavage, [new Cleavage(cleavageTitle1)]),
        application => whenEventOccurs(application.gateways.event, new PublicCleavageEvent()),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.THEN, application.gateways.interface, new Cleavage(cleavageTitle1)),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, application.repositories.cleavage, []),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, application.gateways.interface, [new Sound(SupportedSound.DICE_ROLL)])
    ]),
    scenario('Scenario 2 : With two public cleavages', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application.repositories.cleavage, [new Cleavage(cleavageTitle1), new Cleavage(cleavageTitle2)]),
        application => whenEventOccurs(application.gateways.event, new PublicCleavageEvent()),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.THEN, application.gateways.interface, new Cleavage(cleavageTitle1)),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, application.repositories.cleavage, [new Cleavage(cleavageTitle2)]),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, application.gateways.interface, [new Sound(SupportedSound.DICE_ROLL)])
    ]),
    scenario('Scenario 3 : No public cleavages', [
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.GIVEN, application.repositories.cleavage, []),
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.AND_GIVEN, application.gateways.interface, new Cleavage(cleavageTitle1)),
        application => whenEventOccurs(application.gateways.event, new PublicCleavageEvent()),
        application => theInterfaceGatewayDontHaveCleavage(Gherkin.THEN, application.gateways.interface),
        application => theInterfaceGatewayHasNotifications(Gherkin.AND_THEN, application.gateways.interface, noPublicCleavageNotification),
        application => theCleavageRepositoryHasPublicCleavages(Gherkin.AND_THEN, application.repositories.cleavage, []),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.AND_THEN, application.gateways.interface, [new Sound(SupportedSound.ERROR)])
    ])
])
