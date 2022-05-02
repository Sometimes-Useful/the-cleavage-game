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
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.GIVEN, new Map()),
        whenEventOccurs(new DrawEvent(bar.id, { position: bar.position, spriteType: SpriteType.BAR, size: bar.size })),
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.THEN, new Map([[bar.id, interfaceEntityState(bar.position, SpriteType.BAR, bar.size)]]))
    ]),
    clientScenario('Scenario 2 - Draw stool', [
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.GIVEN, new Map()),
        whenEventOccurs(new DrawEvent(stool1A.id, { position: stool1A.position, spriteType: SpriteType.STOOL, size: stool1A.size })),
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.THEN, new Map([[stool1A.id, interfaceEntityState(stool1A.position, SpriteType.STOOL, stool1A.size)]]))
    ]),
    clientScenario('Scenario 3 - ReDraw stool', [
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.GIVEN, new Map([[stool1A.id, interfaceEntityState(stool1B.position, SpriteType.STOOL, stool1A.size)]])),
        whenEventOccurs(new DrawEvent(stool1A.id, { position: stool1C.position, spriteType: SpriteType.STOOL, size: stool1A.size })),
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.THEN, new Map([[stool1A.id, interfaceEntityState(stool1C.position, SpriteType.STOOL, stool1A.size)]]))
    ]),
    clientScenario('Scenario 4 - Erase stool', [
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.GIVEN, new Map([[stool1A.id, interfaceEntityState(stool1A.position, SpriteType.STOOL, stool1A.size)]])),
        whenEventOccurs(new DrawEvent(stool1A.id, undefined)),
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.THEN, new Map())
    ])
])
