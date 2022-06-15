import { helpMessage } from '../../entities/playerMessages'
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayHasHelpIsEnabled, theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { HelpDisabledEvent } from './HelpDisabledEvent'

feature(EventType.HELP_DISABLED, [
    clientScenario('Scenario 1 : Disabled', [
        theInterfaceGatewayHasHelpIsEnabled(Gherkin.GIVEN, helpMessage),
        whenEventOccurs(new HelpDisabledEvent()),
        theInterfaceGatewayHasHelpIsEnabled(Gherkin.THEN, undefined),
        theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, new Sound(SupportedSound.TICK))
    ])
])
