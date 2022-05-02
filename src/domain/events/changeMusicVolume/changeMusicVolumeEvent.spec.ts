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
        theInterfaceGatewayHasCurrentMusicVolume(Gherkin.GIVEN, 0),
        whenEventOccurs(new ChangeMusicVolumeEvent(100)),
        theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, new Sound(SupportedSound.TICK)),
        theInterfaceGatewayHasCurrentMusicVolume(Gherkin.AND_THEN, 100)
    ]),
    clientScenario('Scenario 2 : Reduce Music Volume', [
        theInterfaceGatewayHasCurrentMusicVolume(Gherkin.GIVEN, 100),
        whenEventOccurs(new ChangeMusicVolumeEvent(22)),
        theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, new Sound(SupportedSound.TICK)),
        theInterfaceGatewayHasCurrentMusicVolume(Gherkin.AND_THEN, 22)
    ])
])
