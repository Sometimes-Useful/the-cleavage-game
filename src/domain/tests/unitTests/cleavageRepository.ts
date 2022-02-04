import { expect } from 'chai'
import { Test, it } from 'mocha'
import type { FakeApplication } from '../../../infra/applications/FakeApplication'
import type { Cleavage } from '../../entities/Cleavage'
import type { Gherkin } from '../Gherkin'
import { detailedComparisonMessage, isGiven, stringifyWithDetailledSetAndMap } from './unitTests'

export const theCurrentCleavageRepositoryDontHaveCleavage = (gherkinPrefix: Gherkin, application: FakeApplication): Test =>
    it(`${gherkinPrefix} the current cleavage repository don't have a current cleavage.`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.currentCleavage.cleavage = undefined
        expect(application.repositories.currentCleavage.cleavage).equal(undefined)
    })

export const theCurrentCleavageRepositoryHasCleavage = (gherkinPrefix: Gherkin, application: FakeApplication, expectedCleavage: Cleavage): Test =>
    it(`${gherkinPrefix} the current cleavage repository has the following cleavage: ${stringifyWithDetailledSetAndMap(expectedCleavage)}`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.currentCleavage.cleavage = expectedCleavage
        expect(application.repositories.currentCleavage.cleavage).deep.equal(expectedCleavage, detailedComparisonMessage(application.repositories.currentCleavage.cleavage, expectedCleavage))
    })

export const theCleavageRepositoryHasPublicCleavages = (gherkinPrefix: Gherkin, application: FakeApplication, expectedPublicCleavages: Cleavage|Cleavage[]):Test => {
    const publicCleavages : Cleavage[] = Array.isArray(expectedPublicCleavages) ? expectedPublicCleavages : [expectedPublicCleavages]
    return it(`${gherkinPrefix} the cleavage repository has the following public cleavages: ${stringifyWithDetailledSetAndMap(publicCleavages)}`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.publicCleavageDrawPile.publicCleavages = publicCleavages
        expect(application.repositories.publicCleavageDrawPile.publicCleavages).deep.equal(publicCleavages, detailedComparisonMessage(application.repositories.publicCleavageDrawPile.publicCleavages, publicCleavages))
    })
}

export const theGlobalCleavageDrawPileRepositoryDontHaveCleavages = (gherkinPrefix: Gherkin, application: FakeApplication): Test =>
    it(`${gherkinPrefix} the global cleavage draw pile repository don't have cleavages.`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.globalCleavageDrawPile.globalCleavages = []
        expect(application.repositories.globalCleavageDrawPile.globalCleavages).deep.equal([])
    })

export const theGlobalCleavageDrawPileRepositoryHasCleavages = (gherkinPrefix: Gherkin, application: FakeApplication, expectedGlobalCleavages: Cleavage|Cleavage[]) : Test => {
    const globalCleavages : Cleavage[] = Array.isArray(expectedGlobalCleavages) ? expectedGlobalCleavages : [expectedGlobalCleavages]
    return it(`${gherkinPrefix} the global cleavage repository has the following global cleavages: ${stringifyWithDetailledSetAndMap(globalCleavages)}`, () => {
        if (isGiven(gherkinPrefix))application.repositories.globalCleavageDrawPile.globalCleavages = globalCleavages
        expect(application.repositories.globalCleavageDrawPile.globalCleavages).deep.equal(globalCleavages, detailedComparisonMessage(application.repositories.globalCleavageDrawPile.globalCleavages, globalCleavages))
    })
}
