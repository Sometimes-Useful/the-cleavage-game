import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayHasCurrentVideoExtractVolume, theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { ChangeVideoExtractVolumeEvent } from './ChangeVideoExtractVolumeEvent'

feature(EventType.CHANGE_VIDEO_EXTRACT_VOLUME, [
    clientScenario('Scenario 1 : Increase Video Extract Volume', [
        theInterfaceGatewayHasCurrentVideoExtractVolume(Gherkin.GIVEN, 0),
        whenEventOccurs(new ChangeVideoExtractVolumeEvent(100)),
        theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, new Sound(SupportedSound.TICK)),
        theInterfaceGatewayHasCurrentVideoExtractVolume(Gherkin.AND_THEN, 100)
    ]),
    clientScenario('Scenario 2 : Reduce Video Extract Volume', [
        theInterfaceGatewayHasCurrentVideoExtractVolume(Gherkin.GIVEN, 100),
        whenEventOccurs(new ChangeVideoExtractVolumeEvent(22)),
        theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, new Sound(SupportedSound.TICK)),
        theInterfaceGatewayHasCurrentVideoExtractVolume(Gherkin.AND_THEN, 22)
    ])
])
