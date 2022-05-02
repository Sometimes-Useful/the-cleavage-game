import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { EventType } from '../EventType'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { CreateBarEvent } from './CreateBarEvent'
import { NavigateEvent } from '../navigateEvent/NavigateEvent'
import { InterfaceView } from '../../entities/InterfaceView'
import { Gherkin } from '../../tests/Gherkin'
import { theBarRepositoryHasBar } from '../../tests/unitTests/barRepository'
import { bar } from '../../tests/testContexts'
import { DrawEvent } from '../draw/DrawEvent'
import { InstallNewStoolsOnBarEvent } from '../installNewStoolOnBar/InstallNewStoolsOnBarEvent'
import { theUuidGatewayHasUuids } from '../../tests/unitTests/uuidGateway'
import { ChangeGamePhaseEvent } from '../changeGamePhase/ChangeGamePhaseEvent'
import { GamePhase } from '../../entities/GamePhase'
import { SpriteType } from '../../entities/SpriteType'
feature(EventType.CREATE_BAR, [
    clientScenario('Scenario 1', [
        theBarRepositoryHasBar(Gherkin.GIVEN, { id: '0', position: { x: 99999, y: 99999 }, size: { width: 99999, height: 99999 } }),
        theUuidGatewayHasUuids(Gherkin.GIVEN, bar.id),
        whenEventOccurs(new CreateBarEvent()),
        theBarRepositoryHasBar(Gherkin.THEN, bar),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnBarEvent(),
            new DrawEvent(bar.id, { position: bar.position, spriteType: SpriteType.BAR, size: bar.size }),
            new NavigateEvent(InterfaceView.GAME),
            new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE)
        ])
    ])
])
