import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { EventType } from '../EventType'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { InstallNewStoolsOnBarEvent } from './InstallNewStoolsOnBarEvent'
import { theBarRepositoryDontHaveAvailableStoolBar, theBarRepositoryHasAvailableStoolBars, theBarRepositoryHasBar } from '../../tests/unitTests/barRepository'
import { Gherkin } from '../../tests/Gherkin'
import { bar, barStools } from '../../tests/testContexts'
import { DrawEvent } from '../draw/DrawEvent'
import { theUuidGatewayHasUuids } from '../../tests/unitTests/uuidGateway'
import { Sprite } from '../playerMove/Sprite'

feature(EventType.INSTALL_NEW_STOOLS_ON_BAR, [
    clientScenario('Scenario 1', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryDontHaveAvailableStoolBar(Gherkin.AND_GIVEN, app),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, barStools.map(stool => stool.id)),
        app => whenEventOccurs(app, new InstallNewStoolsOnBarEvent()),
        app => theBarRepositoryHasAvailableStoolBars(Gherkin.THEN, app, barStools),
        app => theEventIsSent(Gherkin.AND_THEN, app, barStools.map(stool => new DrawEvent(stool.id, { position: stool.position, sprite: Sprite.STOOL })))
    ])
])
