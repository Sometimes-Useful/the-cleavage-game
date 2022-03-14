import { expect } from 'chai'
import { Test, it } from 'mocha'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { Gherkin } from '../Gherkin'
import { stringifyWithDetailledSetAndMap, isGiven, detailedComparisonMessage } from './unitTests'

export const theUuidGatewayHasUuids = (gherkinPrefix: Gherkin, application: FakeClientApplication, uuid: string|string[]): Test => {
    const expectedUuids : string[] = Array.isArray(uuid) ? uuid : [uuid]
    return it(`${gherkinPrefix} the Uuid gateway has following uuids '${stringifyWithDetailledSetAndMap(expectedUuids)}'.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.uuid.uuids = expectedUuids
        expect(application.gateways.uuid.uuids).deep.equal(expectedUuids, detailedComparisonMessage(application.gateways.uuid.uuids, expectedUuids))
    })
}
