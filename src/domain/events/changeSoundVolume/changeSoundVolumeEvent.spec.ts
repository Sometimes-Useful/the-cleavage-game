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
        theInterfaceGatewayHasCurrentSoundVolume(Gherkin.GIVEN, 0),
        whenEventOccurs(new ChangeSoundVolumeEvent(100)),
        theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, new Sound(SupportedSound.TICK)),
        theInterfaceGatewayHasCurrentSoundVolume(Gherkin.AND_THEN, 100)
    ]),
    clientScenario('Scenario 2 : Reduce Sound Volume', [
        theInterfaceGatewayHasCurrentSoundVolume(Gherkin.GIVEN, 100),
        whenEventOccurs(new ChangeSoundVolumeEvent(22)),
        theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, new Sound(SupportedSound.TICK)),
        theInterfaceGatewayHasCurrentSoundVolume(Gherkin.AND_THEN, 22)
    ])
])
