import { expect } from 'chai'
import { Test, it } from 'mocha'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { Gherkin } from '../Gherkin'
import { isGiven } from './unitTests'

export const theDateGatewayHasCurrentDate = (gherkinPrefix:Gherkin, expectedCurrentDate:Date) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the date gateway has the following current date : ${expectedCurrentDate.toISOString()}`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.date.currentDate = expectedCurrentDate
        expect(application.gateways.date.currentDate).deep.equal(expectedCurrentDate)
    })
