import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { Gherkin } from '../../tests/Gherkin'
import { cleavage1, cleavage2 } from '../../tests/testContexts'
import { theGlobalCleavageDrawPileGatewayHasCleavages } from '../../tests/unitTests/cleavageRepository'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'
import { theInterfaceGatewayDontHaveCleavageDrawpileQuantity, theInterfaceGatewayHasCleavageDrawpileQuantity } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { RefreshCleavageDrawpileQuantityEvent } from './RefreshCleavageDrawpileQuantityEvent'

feature(EventType.REFRESH_CLEAVAGE_DRAWPILE_QUANTITY, [
    clientScenario('Scénario 1: refresh cleavage drawpile quantity on UI with 1 cleavage on drawpile.', [
        theInterfaceGatewayDontHaveCleavageDrawpileQuantity(Gherkin.GIVEN),
        theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.AND_GIVEN, cleavage1),
        whenEventOccurs(new RefreshCleavageDrawpileQuantityEvent()),
        theInterfaceGatewayHasCleavageDrawpileQuantity(Gherkin.THEN, 1)
    ]),
    clientScenario('Scénario 2: refresh cleavage drawpile quantity on UI with 2 cleavage on drawpile.', [
        theInterfaceGatewayDontHaveCleavageDrawpileQuantity(Gherkin.GIVEN),
        theGlobalCleavageDrawPileGatewayHasCleavages(Gherkin.AND_GIVEN, [cleavage1, cleavage2]),
        whenEventOccurs(new RefreshCleavageDrawpileQuantityEvent()),
        theInterfaceGatewayHasCleavageDrawpileQuantity(Gherkin.THEN, 2)
    ])
])
