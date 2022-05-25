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
        thePlayerRepositoryHasPlayers(Gherkin.GIVEN, [player1()]),
        //  theInterfaceGatewayHasEntityPositions(Gherkin.AND_GIVEN, new Map()),
        whenEventOccurs(new PlayerMoveEvent(player1().username, position1)),
        thePlayerRepositoryHasPlayers(Gherkin.THEN, [player1(position1)]),
        theEventIsSent(Gherkin.AND_THEN, new DrawEvent(player1().username, { position: player1(position1).position!, spriteType: SpriteType.PLAYER, size: player1(position1).size }))
        //  theInterfaceGatewayHasEntityPositions(Gherkin.AND_THEN, new Map([[player1().username, interfaceEntityState(position1, Sprite.PLAYER)]]))
    ]),
    clientScenario('Scenario 1 : player move with initial position', [
        thePlayerRepositoryHasPlayers(Gherkin.GIVEN, [player1(position1)]),
        //  theInterfaceGatewayHasEntityPositions(Gherkin.AND_GIVEN, new Map([[player1().username, interfaceEntityState(position1, Sprite.PLAYER)]])),
        whenEventOccurs(new PlayerMoveEvent(player1().username, position2)),
        thePlayerRepositoryHasPlayers(Gherkin.THEN, [player1(position2)]),
        theEventIsSent(Gherkin.AND_THEN, new DrawEvent(player1(position2).username, { position: player1(position2).position!, spriteType: SpriteType.PLAYER, size: player1(position2).size }))
        //  theInterfaceGatewayHasEntityPositions(Gherkin.AND_THEN, new Map([[player1().username, interfaceEntityState(position2, Sprite.PLAYER)]]))
    ])
])
