
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'

import { theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { PlayerWhistleEvent } from './PlayerWhistleEvent'

feature(EventType.PLAYER_SHOOT, [
    clientScenario('Scenario 1 : Player whistle', [
        whenEventOccurs(new PlayerWhistleEvent()),
        theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, new Sound(SupportedSound.WHISTLE))
    ])
])
