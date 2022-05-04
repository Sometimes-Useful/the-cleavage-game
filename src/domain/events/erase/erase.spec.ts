import { SpriteType } from '../../entities/SpriteType'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { player1, player2, table1, table2 } from '../../tests/testContexts'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayHasEntityInterfaceState } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { EraseEvent } from './EraseEvent'

feature(EventType.ERASE, [
    clientScenario('Scenario 1 : Erase single entity', [
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.GIVEN, new Map([[player1().username, { position: table1.position, size: player1().size, spriteType: SpriteType.PLAYER }]])),
        whenEventOccurs(new EraseEvent(player1().username)),
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.THEN, new Map())
    ]),
    clientScenario('Scenario 2 : Erase multiple entities & keep remaining entities', [
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.GIVEN, new Map([
            [player1().username, { position: table1.position, size: player1().size, spriteType: SpriteType.PLAYER }],
            [player2().username, { position: table2.position, size: player2().size, spriteType: SpriteType.PLAYER }],
            [table1.id, { position: table1.position, size: table1.size, spriteType: SpriteType.TABLE }]
        ])),
        whenEventOccurs(new EraseEvent([player1().username, player2().username])),
        theInterfaceGatewayHasEntityInterfaceState(Gherkin.THEN, new Map([[table1.id, { position: table1.position, size: table1.size, spriteType: SpriteType.TABLE }]]))
    ])
])
