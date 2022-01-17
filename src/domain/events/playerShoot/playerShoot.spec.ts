import { Sound } from '../../entities/sound'
import { SoundType } from '../../ports/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { feature, scenario } from '../../tests/testSuites'
import { theInterfaceGatewayHasPlayingSounds, whenEventOccurs } from '../../tests/unitTests'
import { EventType } from '../EventType'
import { PlayerShootEvent } from './PlayerShootEvent'

feature(EventType.PLAYER_SHOOT, [
    scenario('Scenario 1 : Player shoot', [
        application => whenEventOccurs(application.gateways.event, new PlayerShootEvent()),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application.gateways.interface, new Sound(SoundType.SHOOT))
    ])
])
