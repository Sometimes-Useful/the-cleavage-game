import { expect } from 'chai'
import { Test, it } from 'mocha'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { VideoExtract } from '../../entities/VideoExtract'
import type { Gherkin } from '../Gherkin'
import { isGiven } from './unitTests'

export const theVideoExtractRepositoryHasExtracts = (gherkin:Gherkin, application:FakeClientApplication, expectedVideoExtracts:VideoExtract[]):Test => {
    return it(`${gherkin} the video extract repository has extracts: ${expectedVideoExtracts}`, () => {
        if (isGiven(gherkin)) application.repositories.videoExtracts.videoExtracts = expectedVideoExtracts
        expect(application.repositories.videoExtracts.videoExtracts).deep.equal(expectedVideoExtracts)
    })
}

export const theVideoExtractRepositoryHasNoExtracts = (gherkin:Gherkin, application:FakeClientApplication):Test => {
    return it(`${gherkin} the video extract repository has no extracts.`, () => {
        if (isGiven(gherkin)) application.repositories.videoExtracts.videoExtracts = []
        expect(application.repositories.videoExtracts.videoExtracts).deep.equal([])
    })
}
