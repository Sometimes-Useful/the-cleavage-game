import { Direction } from '../../applicationServices/Direction'
import { SpriteType } from '../../entities/SpriteType'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { bar, table1, table10, table11, table12, table13, table14, table15, table16, table17, table18, table19, table2, table20, table21, table22, table23, table24, table25, table26, table27, table28, table29, table3, table30, table31, table32, table33, table34, table35, table36, table37, table38, table39, table4, table40, table41, table42, table43, table44, table45, table46, table5, table6, table7, table8, table9 } from '../../tests/testContexts'
import { theBarRepositoryDontHaveTable, theBarRepositoryHasBar, theBarRepositoryHasTable, theBarRepositoryHasTableDirection } from '../../tests/unitTests/barRepository'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theUuidGatewayHasUuids } from '../../tests/unitTests/uuidGateway'
import { DrawEvent } from '../draw/DrawEvent'
import { EventType } from '../EventType'
import { InstallNewStoolsOnTableEvent } from '../installNewStoolsOnTable/InstallNewStoolsOnTableEvent'
import { InstallNewTableEvent } from './InstallNewTableEvent'

feature(EventType.INSTALL_NEW_TABLE, [
    clientScenario('Scenario 1 - First table', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.RIGHT),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, table1.id),
        theBarRepositoryDontHaveTable(Gherkin.GIVEN),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table1]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table1.id),
            new DrawEvent(table1.id, { size: table1.size, position: table1.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.RIGHT)
    ]),
    clientScenario('Scenario 2 - 2 Tables', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.RIGHT),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, table2.id),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table1]),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table1, table2]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table2.id),
            new DrawEvent(table2.id, { size: table2.size, position: table2.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.RIGHT)
    ]),
    clientScenario('Scenario 3 - 3 Tables', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.RIGHT),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, table3.id),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table1, table2]),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table1, table2, table3]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table3.id),
            new DrawEvent(table3.id, { size: table3.size, position: table3.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.RIGHT)
    ]),
    clientScenario('Scenario 4 - First Upper Side', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.RIGHT),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, [table2.id, table3.id, table4.id]),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table1]),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table1, table2, table3, table4]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table2.id),
            new DrawEvent(table2.id, { size: table2.size, position: table2.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table3.id),
            new DrawEvent(table3.id, { size: table3.size, position: table3.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table4.id),
            new DrawEvent(table4.id, { size: table4.size, position: table4.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.RIGHT)
    ]),
    clientScenario('Scenario 5 - First Upper Right Corner', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.RIGHT),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, table5.id),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table3, table4]),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table3, table4, table5]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table5.id),
            new DrawEvent(table5.id, { size: table5.size, position: table5.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.DOWN)
    ]),
    clientScenario('Scenario 6 - First Left Side', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.RIGHT),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, [table4.id, table5.id, table6.id, table7.id, table8.id, table9.id]),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table3]),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table3, table4, table5, table6, table7, table8, table9]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table4.id),
            new DrawEvent(table4.id, { size: table4.size, position: table4.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table5.id),
            new DrawEvent(table5.id, { size: table5.size, position: table5.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table6.id),
            new DrawEvent(table6.id, { size: table6.size, position: table6.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table7.id),
            new DrawEvent(table7.id, { size: table7.size, position: table7.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table8.id),
            new DrawEvent(table8.id, { size: table8.size, position: table8.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table9.id),
            new DrawEvent(table9.id, { size: table9.size, position: table9.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.DOWN)
    ]),
    clientScenario('Scenario 7 - First Bottom Right Corner', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.DOWN),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, table10.id),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table8, table9]),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table8, table9, table10]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table10.id),
            new DrawEvent(table10.id, { size: table10.size, position: table10.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.LEFT)
    ]),
    clientScenario('Scenario 8 - First Bottom Side', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.DOWN),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, [table9.id, table10.id, table11.id, table12.id, table13.id]),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table8]),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table8, table9, table10, table11, table12, table13]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table9.id),
            new DrawEvent(table9.id, { size: table9.size, position: table9.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table10.id),
            new DrawEvent(table10.id, { size: table10.size, position: table10.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table11.id),
            new DrawEvent(table11.id, { size: table11.size, position: table11.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table12.id),
            new DrawEvent(table12.id, { size: table12.size, position: table12.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table13.id),
            new DrawEvent(table13.id, { size: table13.size, position: table13.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.LEFT)
    ]),
    clientScenario('Scenario 9 - First Bottom Left Corner', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.LEFT),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, table14.id),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table12, table13]),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table12, table13, table14]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table14.id),
            new DrawEvent(table14.id, { size: table14.size, position: table14.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.UP)
    ]),
    clientScenario('Scenario 10 - First Left Side', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.LEFT),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, [table13.id, table14.id, table15.id, table16.id, table17.id, table18.id, table19.id]),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table1, table12]),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table1, table12, table13, table14, table15, table16, table17, table18, table19]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table13.id),
            new DrawEvent(table13.id, { size: table13.size, position: table13.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table14.id),
            new DrawEvent(table14.id, { size: table14.size, position: table14.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table15.id),
            new DrawEvent(table15.id, { size: table15.size, position: table15.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table16.id),
            new DrawEvent(table16.id, { size: table16.size, position: table16.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table17.id),
            new DrawEvent(table17.id, { size: table17.size, position: table17.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table18.id),
            new DrawEvent(table18.id, { size: table18.size, position: table18.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table19.id),
            new DrawEvent(table19.id, { size: table19.size, position: table19.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.UP)
    ]),
    clientScenario('Scenario 11 - Table 19', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.UP),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, table19.id),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table1, table17, table18]),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table1, table17, table18, table19]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table19.id),
            new DrawEvent(table19.id, { size: table19.size, position: table19.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.UP)
    ]),
    clientScenario('Scenario 12 - First Bottom Left Corner', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.UP),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, table20.id),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table1, table18, table19]),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table1, table18, table19, table20]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table20.id),
            new DrawEvent(table20.id, { size: table20.size, position: table20.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.RIGHT)
    ]),
    clientScenario('Scenario 13 - Second Upper Side', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.UP),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, [table19.id, table20.id, table21.id, table22.id, table23.id, table24.id]),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table1, table2, table3, table4, table18]),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table1, table2, table3, table4, table18, table19, table20, table21, table22, table23, table24]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table19.id),
            new DrawEvent(table19.id, { size: table19.size, position: table19.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table20.id),
            new DrawEvent(table20.id, { size: table20.size, position: table20.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table21.id),
            new DrawEvent(table21.id, { size: table21.size, position: table21.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table22.id),
            new DrawEvent(table22.id, { size: table22.size, position: table22.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table23.id),
            new DrawEvent(table23.id, { size: table23.size, position: table23.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table24.id),
            new DrawEvent(table24.id, { size: table24.size, position: table24.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.RIGHT)
    ]),
    clientScenario('Scenario 14 - Second Upper Right Corner', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.RIGHT),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, table25.id),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table4, table23, table24]),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table4, table23, table24, table25]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table25.id),
            new DrawEvent(table25.id, { size: table25.size, position: table25.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.DOWN)
    ]),
    clientScenario('Scenario 15 - Second Right Side', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.RIGHT),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, [table24.id, table25.id, table26.id, table27.id, table28.id, table29.id, table30.id, table31.id]),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table4, table5, table6, table7, table8, table9, table23]),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table4, table5, table6, table7, table8, table9, table23, table24, table25, table26, table27, table28, table29, table30, table31]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table24.id),
            new DrawEvent(table24.id, { size: table24.size, position: table24.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table25.id),
            new DrawEvent(table25.id, { size: table25.size, position: table25.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table26.id),
            new DrawEvent(table26.id, { size: table26.size, position: table26.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table27.id),
            new DrawEvent(table27.id, { size: table27.size, position: table27.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table28.id),
            new DrawEvent(table28.id, { size: table28.size, position: table28.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table29.id),
            new DrawEvent(table29.id, { size: table29.size, position: table29.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table30.id),
            new DrawEvent(table30.id, { size: table30.size, position: table30.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table31.id),
            new DrawEvent(table31.id, { size: table31.size, position: table31.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.DOWN)
    ]),
    clientScenario('Scenario 16 - Second Bottom Right Corner', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.DOWN),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, table32.id),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table9, table30, table31]),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table9, table30, table31, table32]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table32.id),
            new DrawEvent(table32.id, { size: table32.size, position: table32.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.LEFT)
    ]),
    clientScenario('Scenario 17 - Second Bottom Side', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.DOWN),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, [table31.id, table32.id, table33.id, table34.id, table35.id, table36.id, table37.id]),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table9, table10, table11, table12, table13, table30]),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table9, table10, table11, table12, table13, table30, table31, table32, table33, table34, table35, table36, table37]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table31.id),
            new DrawEvent(table31.id, { size: table31.size, position: table31.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table32.id),
            new DrawEvent(table32.id, { size: table32.size, position: table32.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table33.id),
            new DrawEvent(table33.id, { size: table33.size, position: table33.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table34.id),
            new DrawEvent(table34.id, { size: table34.size, position: table34.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table35.id),
            new DrawEvent(table35.id, { size: table35.size, position: table35.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table36.id),
            new DrawEvent(table36.id, { size: table36.size, position: table36.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table37.id),
            new DrawEvent(table37.id, { size: table37.size, position: table37.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.LEFT)
    ]),
    clientScenario('Scenario 18 - Second Bottom Left Corner', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.LEFT),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, table38.id),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table13, table36, table37]),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table13, table36, table37, table38]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table38.id),
            new DrawEvent(table38.id, { size: table38.size, position: table38.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.UP)
    ]),
    clientScenario('Scenario 19 - Second Left Side', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.LEFT),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, [table37.id, table38.id, table39.id, table40.id, table41.id, table42.id, table43.id, table44.id, table45.id]),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table13, table14, table15, table16, table17, table18, table19, table36]),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table13, table14, table15, table16, table17, table18, table19, table36, table37, table38, table39, table40, table41, table42, table43, table44, table45]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table37.id),
            new DrawEvent(table37.id, { size: table37.size, position: table37.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table38.id),
            new DrawEvent(table38.id, { size: table38.size, position: table38.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table39.id),
            new DrawEvent(table39.id, { size: table39.size, position: table39.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table40.id),
            new DrawEvent(table40.id, { size: table40.size, position: table40.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table41.id),
            new DrawEvent(table41.id, { size: table41.size, position: table41.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table42.id),
            new DrawEvent(table42.id, { size: table42.size, position: table42.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table43.id),
            new DrawEvent(table43.id, { size: table43.size, position: table43.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table44.id),
            new DrawEvent(table44.id, { size: table44.size, position: table44.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table45.id),
            new DrawEvent(table45.id, { size: table45.size, position: table45.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.UP)
    ]),
    clientScenario('Scenario 20 - Second Top Left Corner', [
        theBarRepositoryHasBar(Gherkin.GIVEN, bar),
        theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, Direction.UP),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, table46.id),
        theBarRepositoryHasTable(Gherkin.AND_GIVEN, [table19, table44, table45]),
        whenEventOccurs(new InstallNewTableEvent()),
        theBarRepositoryHasTable(Gherkin.THEN, [table19, table44, table45, table46]),
        theEventIsSent(Gherkin.AND_THEN, [
            new InstallNewStoolsOnTableEvent(table46.id),
            new DrawEvent(table46.id, { size: table46.size, position: table46.position, spriteType: SpriteType.TABLE })
        ]),
        theBarRepositoryHasTableDirection(Gherkin.AND_THEN, Direction.RIGHT)
    ])
])
