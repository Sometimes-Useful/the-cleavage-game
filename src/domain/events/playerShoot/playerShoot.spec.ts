
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { feature, scenario } from '../../tests/testSuites'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'

import { theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { PlayerShootEvent } from './PlayerShootEvent'

feature(EventType.PLAYER_SHOOT, [
    scenario('Scenario 1 : Player shoot', [
        application => whenEventOccurs(application, new PlayerShootEvent()),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application, new Sound(SupportedSound.SHOOT))
    ])
])
