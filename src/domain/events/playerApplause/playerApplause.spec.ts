
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { feature, scenario } from '../../tests/testSuites'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'

import { theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { PlayerApplauseEvent } from './PlayerApplauseEvent'

feature(EventType.PLAYER_APPLAUSE, [
    scenario('Scenario 1 : Player applause', [
        application => whenEventOccurs(application, new PlayerApplauseEvent()),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application, new Sound(SupportedSound.APPLAUSE))
    ])
])
