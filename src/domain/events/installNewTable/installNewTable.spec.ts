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
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.RIGHT),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table1.id),
        app => theBarRepositoryDontHaveTable(Gherkin.GIVEN, app),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table1]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new InstallNewStoolsOnTableEvent(table1.id),
            new DrawEvent(table1.id, { size: table1.size, position: table1.position, spriteType: SpriteType.TABLE })
        ]),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.RIGHT)
    ]),
    clientScenario('Scenario 2 - 2 Tables', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.RIGHT),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table2.id),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table1]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table1, table2]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new InstallNewStoolsOnTableEvent(table2.id),
            new DrawEvent(table2.id, { size: table2.size, position: table2.position, spriteType: SpriteType.TABLE })
        ]),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.RIGHT)
    ]),
    clientScenario('Scenario 3 - 3 Tables', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.RIGHT),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table3.id),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table1, table2]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table1, table2, table3]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new InstallNewStoolsOnTableEvent(table3.id),
            new DrawEvent(table3.id, { size: table3.size, position: table3.position, spriteType: SpriteType.TABLE })
        ]),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.RIGHT)
    ]),
    clientScenario('Scenario 4 - First Upper Side', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.RIGHT),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, [table2.id, table3.id, table4.id]),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table1]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table1, table2, table3, table4]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new InstallNewStoolsOnTableEvent(table2.id),
            new DrawEvent(table2.id, { size: table2.size, position: table2.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table3.id),
            new DrawEvent(table3.id, { size: table3.size, position: table3.position, spriteType: SpriteType.TABLE }),
            new InstallNewStoolsOnTableEvent(table4.id),
            new DrawEvent(table4.id, { size: table4.size, position: table4.position, spriteType: SpriteType.TABLE })
        ]),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.RIGHT)
    ]),
    clientScenario('Scenario 5 - First Upper Right Corner', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.RIGHT),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table5.id),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table3, table4]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table3, table4, table5]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new InstallNewStoolsOnTableEvent(table5.id),
            new DrawEvent(table5.id, { size: table5.size, position: table5.position, spriteType: SpriteType.TABLE })
        ]),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.DOWN)
    ]),
    clientScenario('Scenario 6 - First Left Side', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.RIGHT),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, [table4.id, table5.id, table6.id, table7.id, table8.id, table9.id]),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table3]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table3, table4, table5, table6, table7, table8, table9]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
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
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.DOWN)
    ]),
    clientScenario('Scenario 7 - First Bottom Right Corner', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.DOWN),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table10.id),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table8, table9]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table8, table9, table10]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new InstallNewStoolsOnTableEvent(table10.id),
            new DrawEvent(table10.id, { size: table10.size, position: table10.position, spriteType: SpriteType.TABLE })
        ]),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.LEFT)
    ]),
    clientScenario('Scenario 8 - First Bottom Side', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.DOWN),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, [table9.id, table10.id, table11.id, table12.id, table13.id]),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table8]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table8, table9, table10, table11, table12, table13]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
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
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.LEFT)
    ]),
    clientScenario('Scenario 9 - First Bottom Left Corner', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.LEFT),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table14.id),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table12, table13]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table12, table13, table14]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new InstallNewStoolsOnTableEvent(table14.id),
            new DrawEvent(table14.id, { size: table14.size, position: table14.position, spriteType: SpriteType.TABLE })
        ]),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.UP)
    ]),
    clientScenario('Scenario 10 - First Left Side', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.LEFT),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, [table13.id, table14.id, table15.id, table16.id, table17.id, table18.id, table19.id]),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table1, table12]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table1, table12, table13, table14, table15, table16, table17, table18, table19]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
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
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.UP)
    ]),
    clientScenario('Scenario 11 - Table 19', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.UP),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table19.id),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table1, table17, table18]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table1, table17, table18, table19]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new InstallNewStoolsOnTableEvent(table19.id),
            new DrawEvent(table19.id, { size: table19.size, position: table19.position, spriteType: SpriteType.TABLE })
        ]),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.UP)
    ]),
    clientScenario('Scenario 12 - First Bottom Left Corner', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.UP),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table20.id),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table1, table18, table19]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table1, table18, table19, table20]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new InstallNewStoolsOnTableEvent(table20.id),
            new DrawEvent(table20.id, { size: table20.size, position: table20.position, spriteType: SpriteType.TABLE })
        ]),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.RIGHT)
    ]),
    clientScenario('Scenario 13 - Second Upper Side', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.UP),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, [table19.id, table20.id, table21.id, table22.id, table23.id, table24.id]),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table1, table2, table3, table4, table18]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table1, table2, table3, table4, table18, table19, table20, table21, table22, table23, table24]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
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
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.RIGHT)
    ]),
    clientScenario('Scenario 14 - Second Upper Right Corner', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.RIGHT),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table25.id),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table4, table23, table24]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table4, table23, table24, table25]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new InstallNewStoolsOnTableEvent(table25.id),
            new DrawEvent(table25.id, { size: table25.size, position: table25.position, spriteType: SpriteType.TABLE })
        ]),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.DOWN)
    ]),
    clientScenario('Scenario 15 - Second Right Side', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.RIGHT),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, [table24.id, table25.id, table26.id, table27.id, table28.id, table29.id, table30.id, table31.id]),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table4, table5, table6, table7, table8, table9, table23]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table4, table5, table6, table7, table8, table9, table23, table24, table25, table26, table27, table28, table29, table30, table31]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
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
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.DOWN)
    ]),
    clientScenario('Scenario 16 - Second Bottom Right Corner', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.DOWN),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table32.id),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table9, table30, table31]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table9, table30, table31, table32]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new InstallNewStoolsOnTableEvent(table32.id),
            new DrawEvent(table32.id, { size: table32.size, position: table32.position, spriteType: SpriteType.TABLE })
        ]),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.LEFT)
    ]),
    clientScenario('Scenario 17 - Second Bottom Side', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.DOWN),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, [table31.id, table32.id, table33.id, table34.id, table35.id, table36.id, table37.id]),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table9, table10, table11, table12, table13, table30]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table9, table10, table11, table12, table13, table30, table31, table32, table33, table34, table35, table36, table37]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
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
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.LEFT)
    ]),
    clientScenario('Scenario 18 - Second Bottom Left Corner', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.LEFT),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table38.id),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table13, table36, table37]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table13, table36, table37, table38]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new InstallNewStoolsOnTableEvent(table38.id),
            new DrawEvent(table38.id, { size: table38.size, position: table38.position, spriteType: SpriteType.TABLE })
        ]),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.UP)
    ]),
    clientScenario('Scenario 19 - Second Left Side', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.LEFT),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, [table37.id, table38.id, table39.id, table40.id, table41.id, table42.id, table43.id, table44.id, table45.id]),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table13, table14, table15, table16, table17, table18, table19, table36]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table13, table14, table15, table16, table17, table18, table19, table36, table37, table38, table39, table40, table41, table42, table43, table44, table45]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
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
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.UP)
    ]),
    clientScenario('Scenario 20 - Second Top Left Corner', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.UP),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table46.id),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table19, table44, table45]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table19, table44, table45, table46]),
        app => theEventIsSent(Gherkin.AND_THEN, app, [
            new InstallNewStoolsOnTableEvent(table46.id),
            new DrawEvent(table46.id, { size: table46.size, position: table46.position, spriteType: SpriteType.TABLE })
        ]),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.RIGHT)
    ])
])
