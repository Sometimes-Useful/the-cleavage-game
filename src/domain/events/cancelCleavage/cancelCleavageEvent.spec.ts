import { Cleavage } from '../../entities/Cleavage'
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../ports/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { cleavageTitle1 } from '../../tests/testContexts'
import { feature, scenario } from '../../tests/testSuites'
import { theInterfaceGatewayHasCurrentCleavage, whenEventOccurs, theInterfaceGatewayDontHaveCleavage, theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests'
import { EventType } from '../EventType'
import { CancelCleavageEvent } from './CancelCleavageEvent'

feature(EventType.CANCEL_CLEAVAGE, [
    scenario('Scenario 1 : Cancel Cleavage', [
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.GIVEN, application.gateways.interface, new Cleavage(cleavageTitle1)),
        application => whenEventOccurs(application.gateways.event, new CancelCleavageEvent()),
        application => theInterfaceGatewayDontHaveCleavage(Gherkin.THEN, application.gateways.interface),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application.gateways.interface, new Sound(SupportedSound.QUACK))
    ])
])
