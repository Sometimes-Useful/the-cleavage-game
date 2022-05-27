import { expect } from 'chai'
import { Test, it } from 'mocha'
import { uniqueOrArrayToArray } from '../../../generic/array'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { StreamerDto } from '../../entities/StreamerDto'
import type { Gherkin } from '../Gherkin'
import { isGiven } from './unitTests'

export const theStreamersGatewayDontHaveStreamers = (gherkinPrefix: Gherkin) => (application: FakeClientApplication):Test =>
    it(`${gherkinPrefix} the streamers gateway doesn't have streamers.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.streamers.registeredStreamers = []
        expect(application.gateways.streamers.registeredStreamers).deep.equal([])
    })

export const theStreamersGatewayHasStreamers = (gherkinPrefix: Gherkin, username: StreamerDto|StreamerDto[]) => (application: FakeClientApplication):Test => {
    const expectedUsernames = uniqueOrArrayToArray(username)
    return it(`${gherkinPrefix} the streamers gateway has the following streamers: ${expectedUsernames}`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.streamers.registeredStreamers = expectedUsernames
        expect(application.gateways.streamers.registeredStreamers).deep.equal(expectedUsernames)
    })
}
