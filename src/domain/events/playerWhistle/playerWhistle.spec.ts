import { Sound } from '../../entities/sound'
import { SoundType } from '../../ports/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { feature, scenario } from '../../tests/testSuites'
import { theInterfaceGatewayHasPlayingSounds, whenEventOccurs } from '../../tests/unitTests'
import { EventType } from '../EventType'
import { PlayerWhistleEvent } from './PlayerWhistleEvent'

feature(EventType.PLAYER_SHOOT, [
    scenario('Scenario 1 : Player whistle', [
        application => whenEventOccurs(application.gateways.event, new PlayerWhistleEvent()),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application.gateways.interface, new Sound(SoundType.WHISTLE))
    ])
])
