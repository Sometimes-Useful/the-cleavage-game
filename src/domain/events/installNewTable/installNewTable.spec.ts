import { Direction } from '../../applicationServices/Direction'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { bar, table1, table10, table11, table12, table13, table14, table15, table16, table17, table18, table19, table2, table20, table21, table22, table23, table24, table25, table26, table27, table28, table29, table3, table30, table31, table32, table33, table34, table35, table36, table37, table38, table39, table4, table40, table41, table42, table43, table44, table45, table46, table5, table6, table7, table8, table9 } from '../../tests/testContexts'
import { theBarRepositoryDontHaveTable, theBarRepositoryHasBar, theBarRepositoryHasTable, theBarRepositoryHasTableDirection } from '../../tests/unitTests/barRepository'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theUuidGatewayHasUuids } from '../../tests/unitTests/uuidGateway'
import { EventType } from '../EventType'
import { InstallNewStoolsOnTableEvent } from '../installNewStoolOnTable/InstallNewStoolsOnTableEvent'
import { InstallNewTableEvent } from './InstallNewTableEvent'

feature(EventType.INSTALL_NEW_TABLE, [
    clientScenario('Scenario 1 - First table', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.RIGHT),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table1.id),
        app => theBarRepositoryDontHaveTable(Gherkin.GIVEN, app),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table1]),
        app => theEventIsSent(Gherkin.AND_THEN, app, new InstallNewStoolsOnTableEvent(table1.id)),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.RIGHT)
    ]),
    clientScenario('Scenario 2 - 2 Tables', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.RIGHT),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table2.id),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table1]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table1, table2]),
        app => theEventIsSent(Gherkin.AND_THEN, app, new InstallNewStoolsOnTableEvent(table2.id)),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.RIGHT)
    ]),
    clientScenario('Scenario 3 - 3 Tables', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.RIGHT),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table3.id),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table1, table2]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table1, table2, table3]),
        app => theEventIsSent(Gherkin.AND_THEN, app, new InstallNewStoolsOnTableEvent(table3.id)),
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
            new InstallNewStoolsOnTableEvent(table3.id),
            new InstallNewStoolsOnTableEvent(table4.id)
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
        app => theEventIsSent(Gherkin.AND_THEN, app, new InstallNewStoolsOnTableEvent(table5.id)),
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
            new InstallNewStoolsOnTableEvent(table5.id),
            new InstallNewStoolsOnTableEvent(table6.id),
            new InstallNewStoolsOnTableEvent(table7.id),
            new InstallNewStoolsOnTableEvent(table8.id),
            new InstallNewStoolsOnTableEvent(table9.id)
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
        app => theEventIsSent(Gherkin.AND_THEN, app, new InstallNewStoolsOnTableEvent(table10.id)),
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
            new InstallNewStoolsOnTableEvent(table10.id),
            new InstallNewStoolsOnTableEvent(table11.id),
            new InstallNewStoolsOnTableEvent(table12.id),
            new InstallNewStoolsOnTableEvent(table13.id)
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
        app => theEventIsSent(Gherkin.AND_THEN, app, new InstallNewStoolsOnTableEvent(table14.id)),
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
            new InstallNewStoolsOnTableEvent(table14.id),
            new InstallNewStoolsOnTableEvent(table15.id),
            new InstallNewStoolsOnTableEvent(table16.id),
            new InstallNewStoolsOnTableEvent(table17.id),
            new InstallNewStoolsOnTableEvent(table18.id),
            new InstallNewStoolsOnTableEvent(table19.id)
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
        app => theEventIsSent(Gherkin.AND_THEN, app, new InstallNewStoolsOnTableEvent(table19.id)),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.UP)
    ]),
    clientScenario('Scenario 12 - First Bottom Left Corner', [
        app => theBarRepositoryHasBar(Gherkin.GIVEN, app, bar),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_GIVEN, app, Direction.UP),
        app => theUuidGatewayHasUuids(Gherkin.AND_GIVEN, app, table20.id),
        app => theBarRepositoryHasTable(Gherkin.AND_GIVEN, app, [table1, table18, table19]),
        app => whenEventOccurs(app, new InstallNewTableEvent()),
        app => theBarRepositoryHasTable(Gherkin.THEN, app, [table1, table18, table19, table20]),
        app => theEventIsSent(Gherkin.AND_THEN, app, new InstallNewStoolsOnTableEvent(table20.id)),
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
            new InstallNewStoolsOnTableEvent(table20.id),
            new InstallNewStoolsOnTableEvent(table21.id),
            new InstallNewStoolsOnTableEvent(table22.id),
            new InstallNewStoolsOnTableEvent(table23.id),
            new InstallNewStoolsOnTableEvent(table24.id)
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
        app => theEventIsSent(Gherkin.AND_THEN, app, new InstallNewStoolsOnTableEvent(table25.id)),
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
            new InstallNewStoolsOnTableEvent(table25.id),
            new InstallNewStoolsOnTableEvent(table26.id),
            new InstallNewStoolsOnTableEvent(table27.id),
            new InstallNewStoolsOnTableEvent(table28.id),
            new InstallNewStoolsOnTableEvent(table29.id),
            new InstallNewStoolsOnTableEvent(table30.id),
            new InstallNewStoolsOnTableEvent(table31.id)
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
        app => theEventIsSent(Gherkin.AND_THEN, app, new InstallNewStoolsOnTableEvent(table32.id)),
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
            new InstallNewStoolsOnTableEvent(table32.id),
            new InstallNewStoolsOnTableEvent(table33.id),
            new InstallNewStoolsOnTableEvent(table34.id),
            new InstallNewStoolsOnTableEvent(table35.id),
            new InstallNewStoolsOnTableEvent(table36.id),
            new InstallNewStoolsOnTableEvent(table37.id)
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
        app => theEventIsSent(Gherkin.AND_THEN, app, new InstallNewStoolsOnTableEvent(table38.id)),
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
            new InstallNewStoolsOnTableEvent(table38.id),
            new InstallNewStoolsOnTableEvent(table39.id),
            new InstallNewStoolsOnTableEvent(table40.id),
            new InstallNewStoolsOnTableEvent(table41.id),
            new InstallNewStoolsOnTableEvent(table42.id),
            new InstallNewStoolsOnTableEvent(table43.id),
            new InstallNewStoolsOnTableEvent(table44.id),
            new InstallNewStoolsOnTableEvent(table45.id)
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
        app => theEventIsSent(Gherkin.AND_THEN, app, new InstallNewStoolsOnTableEvent(table46.id)),
        app => theBarRepositoryHasTableDirection(Gherkin.AND_THEN, app, Direction.RIGHT)
    ])
])
