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
        app => theInterfaceGatewayHasCurrentVideoExtractVolume(Gherkin.GIVEN, app, 0),
        app => whenEventOccurs(app, new ChangeVideoExtractVolumeEvent(100)),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, app, new Sound(SupportedSound.TICK)),
        app => theInterfaceGatewayHasCurrentVideoExtractVolume(Gherkin.AND_THEN, app, 100)
    ]),
    clientScenario('Scenario 2 : Reduce Video Extract Volume', [
        app => theInterfaceGatewayHasCurrentVideoExtractVolume(Gherkin.GIVEN, app, 100),
        app => whenEventOccurs(app, new ChangeVideoExtractVolumeEvent(22)),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, app, new Sound(SupportedSound.TICK)),
        app => theInterfaceGatewayHasCurrentVideoExtractVolume(Gherkin.AND_THEN, app, 22)
    ])
])
