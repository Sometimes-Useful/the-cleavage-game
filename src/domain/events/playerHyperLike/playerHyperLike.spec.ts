import { Sound } from '../../entities/sound'
import { SoundType } from '../../ports/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { feature, scenario } from '../../tests/testSuites'
import { theInterfaceGatewayHasPlayingSounds, whenEventOccurs } from '../../tests/unitTests'
import { EventType } from '../EventType'
import { PlayerHyperLikeEvent } from './PlayerHyperLikeEvent'

feature(EventType.PLAYER_HYPERLIKE, [
    scenario('Scenario 1 : Player hyper like', [
        application => whenEventOccurs(application.gateways.event, new PlayerHyperLikeEvent()),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application.gateways.interface, new Sound(SoundType.HYPERLIKE))
    ])
])
