import { SpriteType } from '../../entities/SpriteType'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { player1, position1, position2 } from '../../tests/testContexts'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { thePlayerRepositoryHasPlayers } from '../../tests/unitTests/playerRepository'
import { DrawEvent } from '../draw/DrawEvent'
import { EventType } from '../EventType'
import { PlayerMoveEvent } from './PlayerMoveEvent'
feature(EventType.PLAYER_MOVE, [
    clientScenario('Scenario 1 : player move without initial position', [
        app => thePlayerRepositoryHasPlayers(Gherkin.GIVEN, app, [player1()]),
        // app => theInterfaceGatewayHasEntityPositions(Gherkin.AND_GIVEN, app, new Map()),
        app => whenEventOccurs(app, new PlayerMoveEvent(player1().username, position1)),
        app => thePlayerRepositoryHasPlayers(Gherkin.THEN, app, [player1(position1)]),
        app => theEventIsSent(Gherkin.AND_THEN, app, new DrawEvent(player1().username, { position: player1(position1).position!, spriteType: SpriteType.PLAYER, size: player1(position1).size }))
        // app => theInterfaceGatewayHasEntityPositions(Gherkin.AND_THEN, app, new Map([[player1().username, interfaceEntityState(position1, Sprite.PLAYER)]]))
    ]),
    clientScenario('Scenario 1 : player move with initial position', [
        app => thePlayerRepositoryHasPlayers(Gherkin.GIVEN, app, [player1(position1)]),
        // app => theInterfaceGatewayHasEntityPositions(Gherkin.AND_GIVEN, app, new Map([[player1().username, interfaceEntityState(position1, Sprite.PLAYER)]])),
        app => whenEventOccurs(app, new PlayerMoveEvent(player1().username, position2)),
        app => thePlayerRepositoryHasPlayers(Gherkin.THEN, app, [player1(position2)]),
        app => theEventIsSent(Gherkin.AND_THEN, app, new DrawEvent(player1(position2).username, { position: player1(position2).position!, spriteType: SpriteType.PLAYER, size: player1(position2).size }))
        // app => theInterfaceGatewayHasEntityPositions(Gherkin.AND_THEN, app, new Map([[player1().username, interfaceEntityState(position2, Sprite.PLAYER)]]))
    ])
])
