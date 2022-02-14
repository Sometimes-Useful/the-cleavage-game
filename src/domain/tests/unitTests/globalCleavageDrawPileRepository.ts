import { Test, it } from 'mocha'
import { expect } from 'chai'
import type { FakeServerApplication } from '../../../infra/applications/server/FakeServerApplication'
import type { Cleavage } from '../../entities/Cleavage'
import type { Gherkin } from '../Gherkin'
import { isGiven } from './unitTests'

export const theGlobalCleavageDrawPileRepositoryHasCleavage = (gherkinPrefix: Gherkin, application: FakeServerApplication, cleavageDrawPile: Cleavage | Cleavage[]): Test => {
    const cleavagesDrawPile = Array.isArray(cleavageDrawPile) ? cleavageDrawPile : [cleavageDrawPile]
    return it(`${gherkinPrefix} the global cleavage draw pile repository has cleavage '${JSON.stringify(cleavagesDrawPile)}'.`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.globalCleavageDrawPileRepository.cleavagesDrawPile = cleavagesDrawPile
        expect(application.repositories.globalCleavageDrawPileRepository.cleavagesDrawPile).deep.equal(cleavagesDrawPile)
    })
}
