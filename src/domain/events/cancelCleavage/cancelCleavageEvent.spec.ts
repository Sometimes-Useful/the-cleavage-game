import { Cleavage } from '../../entities/Cleavage'
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { cleavageTitle1 } from '../../tests/testContexts'
import { feature, scenario } from '../../tests/testSuites'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayHasCurrentCleavage, theInterfaceGatewayDontHaveCleavage, theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { CancelCleavageEvent } from './CancelCleavageEvent'

feature(EventType.CANCEL_CLEAVAGE, [
    scenario('Scenario 1 : Cancel Cleavage', [
        application => theInterfaceGatewayHasCurrentCleavage(Gherkin.GIVEN, application, new Cleavage(cleavageTitle1, { name: 'Gôche', players: [] }, { name: 'Drouate', players: [] })),
        application => whenEventOccurs(application, new CancelCleavageEvent()),
        application => theInterfaceGatewayDontHaveCleavage(Gherkin.THEN, application),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application, new Sound(SupportedSound.QUACK))
    ])
])
