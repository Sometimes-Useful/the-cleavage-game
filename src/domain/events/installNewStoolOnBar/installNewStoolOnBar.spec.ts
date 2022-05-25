import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { EventType } from '../EventType'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { InstallNewStoolsOnBarEvent } from './InstallNewStoolsOnBarEvent'
import { theBarRepositoryDontHaveAvailableBarStool, theBarRepositoryHasAvailableStoolBars, theBarRepositoryHasBar } from '../../tests/unitTests/barRepository'
import { Gherkin } from '../../tests/Gherkin'
import { bar, barStools } from '../../tests/testContexts'
import { DrawEvent } from '../draw/DrawEvent'
import { theUuidGatewayHasUuids } from '../../tests/unitTests/uuidGateway'
import { SpriteType } from '../../entities/SpriteType'

feature(EventType.INSTALL_NEW_STOOLS_ON_BAR, [
    clientScenario('Scenario 1', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryDontHaveAvailableBarStool(Gherkin.AND_GIVEN),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, barStools.map(stool => stool.id)),
        whenEventOccurs(new InstallNewStoolsOnBarEvent()),
        theBarRepositoryHasAvailableStoolBars(Gherkin.THEN, barStools),
        theEventIsSent(Gherkin.AND_THEN, barStools.map(stool => new DrawEvent(stool.id, { position: stool.position, spriteType: SpriteType.STOOL, size: stool.size })))
    ])
])
