import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'

import { Gherkin } from '../../tests/Gherkin'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'

import { theInterfaceGatewayHasCurrentMusicVolume, theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { ChangeMusicVolumeEvent } from './ChangeMusicVolumeEvent'

feature(EventType.CHANGE_MUSIC_VOLUME, [
    clientScenario('Scenario 1 : Increase Music Volume', [
        application => theInterfaceGatewayHasCurrentMusicVolume(Gherkin.GIVEN, application, 0),
        application => whenEventOccurs(application, new ChangeMusicVolumeEvent(100)),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application, new Sound(SupportedSound.TICK)),
        application => theInterfaceGatewayHasCurrentMusicVolume(Gherkin.AND_THEN, application, 100)
    ]),
    clientScenario('Scenario 2 : Reduce Music Volume', [
        application => theInterfaceGatewayHasCurrentMusicVolume(Gherkin.GIVEN, application, 100),
        application => whenEventOccurs(application, new ChangeMusicVolumeEvent(22)),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application, new Sound(SupportedSound.TICK)),
        application => theInterfaceGatewayHasCurrentMusicVolume(Gherkin.AND_THEN, application, 22)
    ])
])
