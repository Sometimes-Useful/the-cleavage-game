import { expect } from 'chai'
import { Test, it } from 'mocha'
import { uniqueOrArrayToArray } from '../../../generic/array'
import type { FakeServerApplication } from '../../../infra/applications/server/FakeServerApplication'
import type { StreamerDto } from '../../entities/StreamerDto'
import type { Gherkin } from '../Gherkin'
import { isGiven } from './unitTests'

export const theStreamersRepositoryHasStreamers = (gherkinPrefix: Gherkin, streamer: StreamerDto|StreamerDto[]) => (application:FakeServerApplication):Test => {
    const streamers = uniqueOrArrayToArray(streamer)
    return it(`${gherkinPrefix} the streamers repository has following registered streamers: ${streamers}`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.globalRegisteredStreamers.registeredStreamers = streamers
        expect(application.repositories.globalRegisteredStreamers.registeredStreamers).deep.equal(streamers)
    })
}
export const theStreamersRepositoryDontHaveRegisteredStreamers = (gherkinPrefix: Gherkin) => (application: FakeServerApplication): Test =>
    it(`${gherkinPrefix} the streamers repository don't have registered streamers.`, () => {
        expect(application.repositories.globalRegisteredStreamers.registeredStreamers).deep.equal([])
    })
