
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'

import { theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { PlayerApplauseEvent } from './PlayerApplauseEvent'

feature(EventType.PLAYER_APPLAUSE, [
    clientScenario('Scenario 1 : Player applause', [
        application => whenEventOccurs(application, new PlayerApplauseEvent()),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application, new Sound(SupportedSound.APPLAUSE))
    ])
])
