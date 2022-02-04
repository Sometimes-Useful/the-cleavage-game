import { expect } from 'chai'
import { Test, it } from 'mocha'
import type { FakeApplication } from '../../../infra/applications/FakeApplication'
import type { Gherkin } from '../Gherkin'
import { isGiven } from './unitTests'

export const theDateGatewayHasCurrentDate = (gherkinPrefix:Gherkin, application:FakeApplication, expectedCurrentDate:Date):Test =>
    it(`${gherkinPrefix} the date gateway has the following current date : ${expectedCurrentDate.toISOString()}`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.date.currentDate = expectedCurrentDate
        expect(application.gateways.date.currentDate).deep.equal(expectedCurrentDate)
    })
