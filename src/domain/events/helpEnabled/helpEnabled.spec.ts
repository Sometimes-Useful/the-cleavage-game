import { helpMessage } from '../../entities/playerMessages'
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayHasHelpIsEnabled, theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { HelpEnabledEvent } from './HelpEnabledEvent'

feature(EventType.HELP_ENABLED, [
    clientScenario('Scenario 1 : Enabled', [
        theInterfaceGatewayHasHelpIsEnabled(Gherkin.GIVEN, undefined),
        whenEventOccurs(new HelpEnabledEvent()),
        theInterfaceGatewayHasHelpIsEnabled(Gherkin.THEN, helpMessage),
        theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, new Sound(SupportedSound.TICK))
    ])
])
