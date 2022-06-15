import { it } from 'mocha'
import { expect } from 'chai'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { Gherkin } from '../Gherkin'
import { isGiven } from './unitTests'

export const theRandomGatewayHasNextRandomNumber = (gherkinPrefix: Gherkin, expectedNextRandomNumber: number) => (application: FakeClientApplication) => {
    return it(`${gherkinPrefix} the random gateway has next random number: ${expectedNextRandomNumber}`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.random.predictiveNumber = expectedNextRandomNumber
        expect(application.gateways.random.predictiveNumber).equal(expectedNextRandomNumber)
    })
}
