import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { EventType } from '../EventType'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { DrawEvent } from './DrawEvent'
import { Gherkin } from '../../tests/Gherkin'
import { bar, stool1A, stool1B, stool1C } from '../../tests/testContexts'
import { theInterfaceGatewayHasEntityInterfaceState } from '../../tests/unitTests/interfaceGateway'
import { Sprite } from '../playerMove/Sprite'
import { interfaceEntityState } from '../../ports/secondary/gateways/InterfaceGateway'

feature(EventType.DRAW, [
    clientScenario('Scenario 1 - Draw bar', [
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.GIVEN, app, new Map()),
        app => whenEventOccurs(app, new DrawEvent(bar.id, { position: bar.position, sprite: Sprite.BAR })),
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.THEN, app, new Map([[bar.id, interfaceEntityState(bar.position, Sprite.BAR)]]))
    ]),
    clientScenario('Scenario 2 - Draw stool', [
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.GIVEN, app, new Map()),
        app => whenEventOccurs(app, new DrawEvent(stool1A.id, { position: stool1A.position, sprite: Sprite.STOOL })),
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.THEN, app, new Map([[stool1A.id, interfaceEntityState(stool1A.position, Sprite.STOOL)]]))
    ]),
    clientScenario('Scenario 3 - ReDraw stool', [
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.GIVEN, app, new Map([[stool1A.id, interfaceEntityState(stool1B.position, Sprite.STOOL)]])),
        app => whenEventOccurs(app, new DrawEvent(stool1A.id, { position: stool1C.position, sprite: Sprite.STOOL })),
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.THEN, app, new Map([[stool1A.id, interfaceEntityState(stool1C.position, Sprite.STOOL)]]))
    ]),
    clientScenario('Scenario 4 - Erase stool', [
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.GIVEN, app, new Map([[stool1A.id, interfaceEntityState(stool1A.position, Sprite.STOOL)]])),
        app => whenEventOccurs(app, new DrawEvent(stool1A.id, undefined)),
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.THEN, app, new Map())
    ])
])
