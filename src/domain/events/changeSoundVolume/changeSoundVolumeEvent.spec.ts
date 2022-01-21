import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../ports/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { feature, scenario } from '../../tests/testSuites'
import { whenEventOccurs, theInterfaceGatewayHasPlayingSounds, theInterfaceGatewayHasCurrentSoundVolume } from '../../tests/unitTests'
import { EventType } from '../EventType'
import { ChangeSoundVolumeEvent } from './ChangeSoundVolumeEvent'

feature(EventType.CHANGE_SOUND_VOLUME, [
    scenario('Scenario 1 : Increase Sound Volume', [
        application => theInterfaceGatewayHasCurrentSoundVolume(Gherkin.GIVEN, application.gateways.interface, 0),
        application => whenEventOccurs(application.gateways.event, new ChangeSoundVolumeEvent(100)),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application.gateways.interface, new Sound(SupportedSound.TICK)),
        application => theInterfaceGatewayHasCurrentSoundVolume(Gherkin.AND_THEN, application.gateways.interface, 100)
    ]),
    scenario('Scenario 2 : Reduce Sound Volume', [
        application => theInterfaceGatewayHasCurrentSoundVolume(Gherkin.GIVEN, application.gateways.interface, 100),
        application => whenEventOccurs(application.gateways.event, new ChangeSoundVolumeEvent(22)),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application.gateways.interface, new Sound(SupportedSound.TICK)),
        application => theInterfaceGatewayHasCurrentSoundVolume(Gherkin.AND_THEN, application.gateways.interface, 22)
    ])
])
