import { Sound } from '../../entities/sound'
import { SoundType } from '../../ports/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { feature, scenario } from '../../tests/testSuites'
import { theInterfaceGatewayHasPlayingSounds, whenEventOccurs } from '../../tests/unitTests'
import { EventType } from '../EventType'
import { PlayerApplauseEvent } from './PlayerApplauseEvent'

feature(EventType.PLAYER_APPLAUSE, [
    scenario('Scenario 1 : Player applause', [
        application => whenEventOccurs(application.gateways.event, new PlayerApplauseEvent()),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application.gateways.interface, new Sound(SoundType.APPLAUSE))
    ])
])
