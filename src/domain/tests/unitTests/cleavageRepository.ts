import { expect } from 'chai'
import { Test, it } from 'mocha'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { Cleavage } from '../../entities/Cleavage'
import type { Gherkin } from '../Gherkin'
import { detailedComparisonMessage, isGiven, stringifyWithDetailledSetAndMap } from './unitTests'

export const theCurrentCleavageRepositoryDontHaveCleavage = (gherkinPrefix: Gherkin, application: FakeClientApplication): Test =>
    it(`${gherkinPrefix} the current cleavage repository don't have a current cleavage.`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.currentCleavage.cleavage = undefined
        expect(application.repositories.currentCleavage.cleavage).equal(undefined)
    })

export const theCurrentCleavageRepositoryHasCleavage = (gherkinPrefix: Gherkin, application: FakeClientApplication, expectedCleavage: Cleavage): Test =>
    it(`${gherkinPrefix} the current cleavage repository has the following cleavage: ${stringifyWithDetailledSetAndMap(expectedCleavage)}`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.currentCleavage.cleavage = expectedCleavage
        expect(application.repositories.currentCleavage.cleavage).deep.equal(expectedCleavage, detailedComparisonMessage(application.repositories.currentCleavage.cleavage, expectedCleavage))
    })

export const theCleavageRepositoryHasPublicCleavages = (gherkinPrefix: Gherkin, application: FakeClientApplication, expectedPublicCleavages: Cleavage|Cleavage[]):Test => {
    const publicCleavages : Cleavage[] = Array.isArray(expectedPublicCleavages) ? expectedPublicCleavages : [expectedPublicCleavages]
    return it(`${gherkinPrefix} the cleavage repository has the following public cleavages: ${stringifyWithDetailledSetAndMap(publicCleavages)}`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.publicCleavageDrawPile.publicCleavages = publicCleavages
        expect(application.repositories.publicCleavageDrawPile.publicCleavages).deep.equal(publicCleavages, detailedComparisonMessage(application.repositories.publicCleavageDrawPile.publicCleavages, publicCleavages))
    })
}

export const theGlobalCleavageDrawPileGatewayDontHaveCleavages = (gherkinPrefix: Gherkin, application: FakeClientApplication): Test =>
    it(`${gherkinPrefix} the global cleavage draw pile repository don't have cleavages.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.globalCleavageDrawPile.globalCleavageDrawPile = []
        expect(application.gateways.globalCleavageDrawPile.globalCleavageDrawPile).deep.equal([])
    })

export const theGlobalCleavageDrawPileGatewayHasCleavages = (gherkinPrefix: Gherkin, application: FakeClientApplication, expectedGlobalCleavages: Cleavage|Cleavage[]) : Test => {
    const globalCleavages : Cleavage[] = Array.isArray(expectedGlobalCleavages) ? expectedGlobalCleavages : [expectedGlobalCleavages]
    return it(`${gherkinPrefix} the global cleavage repository has the following global cleavages: ${stringifyWithDetailledSetAndMap(globalCleavages)}`, () => {
        if (isGiven(gherkinPrefix))application.gateways.globalCleavageDrawPile.globalCleavageDrawPile = globalCleavages
        expect(application.gateways.globalCleavageDrawPile.globalCleavageDrawPile).deep.equal(globalCleavages, detailedComparisonMessage(application.gateways.globalCleavageDrawPile.globalCleavageDrawPile, globalCleavages))
    })
}
