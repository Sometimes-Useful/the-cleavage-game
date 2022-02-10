import { expect } from 'chai'
import { Test, it } from 'mocha'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { Gherkin } from '../Gherkin'
import { isGiven } from './unitTests'

export const theAutoPlayRepositoryHasNextCleavageDate = (gherkinPrefix:Gherkin, application:FakeClientApplication, expectedNextCleavageDate:Date):Test =>
    it(`${gherkinPrefix} the autoplay repository has the following next cleavage date : ${expectedNextCleavageDate.toISOString()}`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.autoplay.nextCleavageDate = expectedNextCleavageDate
        expect(application.repositories.autoplay.nextCleavageDate).deep.equal(expectedNextCleavageDate)
    })

export const theAutoPlayRepositoryDontHaveNextCleavageDate = (gherkinPrefix:Gherkin, application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the autoplay repository don't have next cleavage date.`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.autoplay.nextCleavageDate = undefined
        expect(application.repositories.autoplay.nextCleavageDate).equal(undefined)
    })

export const theAutoPlayRepositoryHasAutoPlayInterval = (gherkinPrefix:Gherkin, application:FakeClientApplication, expectedAutoplayInterval:number):Test =>
    it(`${gherkinPrefix} the autoplay repository  has the following autoplay interval : ${expectedAutoplayInterval}`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.autoplay.autoplayInterval = expectedAutoplayInterval
        expect(application.repositories.autoplay.autoplayInterval).equal(expectedAutoplayInterval)
    })
