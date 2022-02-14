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
        application => theInterfaceGatewayHasCurrentSoundVolume(Gherkin.GIVEN, application, 0),
        application => whenEventOccurs(application, new ChangeSoundVolumeEvent(100)),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application, new Sound(SupportedSound.TICK)),
        application => theInterfaceGatewayHasCurrentSoundVolume(Gherkin.AND_THEN, application, 100)
    ]),
    clientScenario('Scenario 2 : Reduce Sound Volume', [
        application => theInterfaceGatewayHasCurrentSoundVolume(Gherkin.GIVEN, application, 100),
        application => whenEventOccurs(application, new ChangeSoundVolumeEvent(22)),
        application => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, application, new Sound(SupportedSound.TICK)),
        application => theInterfaceGatewayHasCurrentSoundVolume(Gherkin.AND_THEN, application, 22)
    ])
])
