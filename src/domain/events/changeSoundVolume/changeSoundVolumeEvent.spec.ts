import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayHasCurrentSoundVolume, theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { ChangeSoundVolumeEvent } from './ChangeSoundVolumeEvent'

feature(EventType.CHANGE_SOUND_VOLUME, [
    clientScenario('Scenario 1 : Increase Sound Volume', [
        app => theInterfaceGatewayHasCurrentSoundVolume(Gherkin.GIVEN, app, 0),
        app => whenEventOccurs(app, new ChangeSoundVolumeEvent(100)),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, app, new Sound(SupportedSound.TICK)),
        app => theInterfaceGatewayHasCurrentSoundVolume(Gherkin.AND_THEN, app, 100)
    ]),
    clientScenario('Scenario 2 : Reduce Sound Volume', [
        app => theInterfaceGatewayHasCurrentSoundVolume(Gherkin.GIVEN, app, 100),
        app => whenEventOccurs(app, new ChangeSoundVolumeEvent(22)),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, app, new Sound(SupportedSound.TICK)),
        app => theInterfaceGatewayHasCurrentSoundVolume(Gherkin.AND_THEN, app, 22)
    ])
])
