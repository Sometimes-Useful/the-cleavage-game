import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../ports/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { feature, scenario } from '../../tests/testSuites'
import { whenEventOccurs, theInterfaceGatewayHasPlayingSounds, theInterfaceGatewayHasCurrentMusicVolume } from '../../tests/unitTests'
import { EventType } from '../EventType'
import { ChangeMusicVolumeEvent } from './ChangeMusicVolumeEvent'

feature(EventType.CHANGE_MUSIC_VOLUME, [
    scenario('Scenario 1 : Increase Music Volume', [
        application => theInterfaceGatewayHasCurrentMusicVolume(Gherkin.GIVEN, application.gateways.interface, 0),
        application => whenEventOccurs(application.gateways.event, new ChangeMusicVolumeEvent(100)),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application.gateways.interface, new Sound(SupportedSound.TICK)),
        application => theInterfaceGatewayHasCurrentMusicVolume(Gherkin.AND_THEN, application.gateways.interface, 100)
    ]),
    scenario('Scenario 2 : Reduce Music Volume', [
        application => theInterfaceGatewayHasCurrentMusicVolume(Gherkin.GIVEN, application.gateways.interface, 100),
        application => whenEventOccurs(application.gateways.event, new ChangeMusicVolumeEvent(22)),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application.gateways.interface, new Sound(SupportedSound.TICK)),
        application => theInterfaceGatewayHasCurrentMusicVolume(Gherkin.AND_THEN, application.gateways.interface, 22)
    ])
])
