import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { stool1A, stool1B, stool1C, stool1D, stool1E, stool1F, stool46A, stool46B, stool46C, stool46D, stool46E, stool46F, table1, table46 } from '../../tests/testContexts'
import { theBarRepositoryHasAvailableTableStool, theBarRepositoryHasTable } from '../../tests/unitTests/barRepository'
import { theEventIsSent, whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theUuidGatewayHasUuids } from '../../tests/unitTests/uuidGateway'
import { EventType } from '../EventType'
import { InstallNewStoolsOnTableEvent } from './InstallNewStoolsOnTableEvent'
import { TableStoolAvailableEvent } from '../tableStoolAvailable/TableStoolAvailableEvent'
import { DrawEvent } from '../draw/DrawEvent'
import { SpriteType } from '../../entities/SpriteType'

feature(EventType.INSTALL_NEW_STOOLS_ON_TABLE, [
    clientScenario('Scenario 1 : stools on table 1', [
        theBarRepositoryHasTable(Gherkin.GIVEN, [table1]),
        theBarRepositoryHasAvailableTableStool(Gherkin.AND_GIVEN, []),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, [stool1A.id, stool1B.id, stool1C.id, stool1D.id, stool1E.id, stool1F.id]),
        whenEventOccurs(new InstallNewStoolsOnTableEvent(table1.id)),
        theBarRepositoryHasAvailableTableStool(Gherkin.THEN, [stool1A, stool1B, stool1C, stool1D, stool1E, stool1F]),
        theEventIsSent(Gherkin.THEN, [
            new TableStoolAvailableEvent(),
            new DrawEvent(stool1A.id, { position: stool1A.position, size: stool1A.size, spriteType: SpriteType.STOOL }),
            new DrawEvent(stool1B.id, { position: stool1B.position, size: stool1B.size, spriteType: SpriteType.STOOL }),
            new DrawEvent(stool1C.id, { position: stool1C.position, size: stool1C.size, spriteType: SpriteType.STOOL }),
            new DrawEvent(stool1D.id, { position: stool1D.position, size: stool1D.size, spriteType: SpriteType.STOOL }),
            new DrawEvent(stool1E.id, { position: stool1E.position, size: stool1E.size, spriteType: SpriteType.STOOL }),
            new DrawEvent(stool1F.id, { position: stool1F.position, size: stool1F.size, spriteType: SpriteType.STOOL })
        ])
    ]),
    clientScenario('Scenario 2 : stools on table 46', [
        theBarRepositoryHasTable(Gherkin.GIVEN, [table46]),
        theBarRepositoryHasAvailableTableStool(Gherkin.AND_GIVEN, [stool1A, stool1B, stool1C, stool1D, stool1E, stool1F]),
        theUuidGatewayHasUuids(Gherkin.AND_GIVEN, [stool46A.id, stool46B.id, stool46C.id, stool46D.id, stool46E.id, stool46F.id]),
        whenEventOccurs(new InstallNewStoolsOnTableEvent(table46.id)),
        theBarRepositoryHasAvailableTableStool(Gherkin.THEN, [stool1A, stool1B, stool1C, stool1D, stool1E, stool1F, stool46A, stool46B, stool46C, stool46D, stool46E, stool46F]),
        theEventIsSent(Gherkin.AND_THEN, [
            new TableStoolAvailableEvent(),
            new DrawEvent(stool46A.id, { position: stool46A.position, size: stool46A.size, spriteType: SpriteType.STOOL }),
            new DrawEvent(stool46B.id, { position: stool46B.position, size: stool46B.size, spriteType: SpriteType.STOOL }),
            new DrawEvent(stool46C.id, { position: stool46C.position, size: stool46C.size, spriteType: SpriteType.STOOL }),
            new DrawEvent(stool46D.id, { position: stool46D.position, size: stool46D.size, spriteType: SpriteType.STOOL }),
            new DrawEvent(stool46E.id, { position: stool46E.position, size: stool46E.size, spriteType: SpriteType.STOOL }),
            new DrawEvent(stool46F.id, { position: stool46F.position, size: stool46F.size, spriteType: SpriteType.STOOL })
        ])
    ])

])
