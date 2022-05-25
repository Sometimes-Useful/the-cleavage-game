import { Cleavage, CleavageDTO } from '../../entities/Cleavage'
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { cleavageTitle1 } from '../../tests/testContexts'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayHasCurrentCleavage, theInterfaceGatewayDontHaveCleavage, theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { CancelCleavageEvent } from './CancelCleavageEvent'

const cleavage1Dto:CleavageDTO = {
    title: cleavageTitle1,
    leftChoice: { name: 'Gôche', players: [] },
    rightChoice: { name: 'Drouate', players: [] },
    players: []
}

feature(EventType.CANCEL_CLEAVAGE, [
    clientScenario('Scenario 1 : Cancel Cleavage', [
        theInterfaceGatewayHasCurrentCleavage(Gherkin.GIVEN, new Cleavage(cleavage1Dto)),
        whenEventOccurs(new CancelCleavageEvent()),
        theInterfaceGatewayDontHaveCleavage(Gherkin.THEN),
        theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, new Sound(SupportedSound.QUACK))
    ])
])
