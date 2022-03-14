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
        app => theInterfaceGatewayHasCurrentMusicVolume(Gherkin.GIVEN, app, 0),
        app => whenEventOccurs(app, new ChangeMusicVolumeEvent(100)),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, app, new Sound(SupportedSound.TICK)),
        app => theInterfaceGatewayHasCurrentMusicVolume(Gherkin.AND_THEN, app, 100)
    ]),
    clientScenario('Scenario 2 : Reduce Music Volume', [
        app => theInterfaceGatewayHasCurrentMusicVolume(Gherkin.GIVEN, app, 100),
        app => whenEventOccurs(app, new ChangeMusicVolumeEvent(22)),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, app, new Sound(SupportedSound.TICK)),
        app => theInterfaceGatewayHasCurrentMusicVolume(Gherkin.AND_THEN, app, 22)
    ])
])
