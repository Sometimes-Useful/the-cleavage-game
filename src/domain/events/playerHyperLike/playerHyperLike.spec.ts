
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { feature, scenario } from '../../tests/testSuites'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'

import { theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { PlayerHyperLikeEvent } from './PlayerHyperLikeEvent'

feature(EventType.PLAYER_HYPERLIKE, [
    scenario('Scenario 1 : Player hyper like', [
        application => whenEventOccurs(application, new PlayerHyperLikeEvent()),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application, new Sound(SupportedSound.HYPERLIKE))
    ])
])
