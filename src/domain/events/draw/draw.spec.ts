import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { EventType } from '../EventType'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { DrawEvent } from './DrawEvent'
import { Gherkin } from '../../tests/Gherkin'
import { bar, stool1A, stool1B, stool1C } from '../../tests/testContexts'
import { theInterfaceGatewayHasEntityInterfaceState } from '../../tests/unitTests/interfaceGateway'
import { interfaceEntityState } from '../../ports/secondary/gateways/InterfaceGateway'
import { SpriteType } from '../../entities/SpriteType'

feature(EventType.DRAW, [
    clientScenario('Scenario 1 - Draw bar', [
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.GIVEN, app, new Map()),
        app => whenEventOccurs(app, new DrawEvent(bar.id, { position: bar.position, spriteType: SpriteType.BAR })),
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.THEN, app, new Map([[bar.id, interfaceEntityState(bar.position, SpriteType.BAR)]]))
    ]),
    clientScenario('Scenario 2 - Draw stool', [
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.GIVEN, app, new Map()),
        app => whenEventOccurs(app, new DrawEvent(stool1A.id, { position: stool1A.position, spriteType: SpriteType.STOOL })),
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.THEN, app, new Map([[stool1A.id, interfaceEntityState(stool1A.position, SpriteType.STOOL)]]))
    ]),
    clientScenario('Scenario 3 - ReDraw stool', [
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.GIVEN, app, new Map([[stool1A.id, interfaceEntityState(stool1B.position, SpriteType.STOOL)]])),
        app => whenEventOccurs(app, new DrawEvent(stool1A.id, { position: stool1C.position, spriteType: SpriteType.STOOL })),
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.THEN, app, new Map([[stool1A.id, interfaceEntityState(stool1C.position, SpriteType.STOOL)]]))
    ]),
    clientScenario('Scenario 4 - Erase stool', [
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.GIVEN, app, new Map([[stool1A.id, interfaceEntityState(stool1A.position, SpriteType.STOOL)]])),
        app => whenEventOccurs(app, new DrawEvent(stool1A.id, undefined)),
        app => theInterfaceGatewayHasEntityInterfaceState(Gherkin.THEN, app, new Map())
    ])
])
