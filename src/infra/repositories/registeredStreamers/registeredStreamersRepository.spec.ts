import { expect } from 'chai'
import { before, describe, it } from 'mocha'
import type { RegisteredStreamersRepository } from '../../../domain/ports/secondary/repositories/RegisteredStreamersRepository'
import { streamer1, streamer2 } from '../../../domain/tests/testContexts'
import { gcpProjectId, gcpClientEmail, gcpPrivateKey } from '../../../env/serverEnvironnementVariables'
import { GcpDatastore } from '../../tech/GcpDatastore'
import { GcpGlobalRegisteredStreamersRepository } from './GcpRegisteredStreamersRepository'
import { InMemoryGlobalRegisteredStreamersRepository } from './InMemoryRegisteredStreamersRepository'

interface IntegrationEnvironnement {
    adapter: RegisteredStreamersRepository
}
const fake:IntegrationEnvironnement = {
    adapter: new InMemoryGlobalRegisteredStreamersRepository()
}
const gcp:IntegrationEnvironnement = {
    adapter: new GcpGlobalRegisteredStreamersRepository(new GcpDatastore({ gcpProjectId, gcpClientEmail, gcpPrivateKey, gcpKindPrefix: 'INT' }))
}

const envs = [
    fake,
    gcp
]
const streamers = [streamer1, streamer2]
describe('Integration Test - Global Registered Streamers Repository', () => {
    envs.forEach(environnement => {
        describe(`${environnement.adapter.constructor.name}`, () => {
            describe('Nothing > save > one streamer', () => {
                before((done) => {
                    if (environnement.adapter.constructor.name === GcpGlobalRegisteredStreamersRepository.name) {
                        const adapter = environnement.adapter as GcpGlobalRegisteredStreamersRepository
                        Promise.all(streamers.map(streamer => adapter.delete(streamer.username)))
                            .then(() => done())
                            .catch(error => done(error))
                    } else { done() }
                })
                streamers.forEach(streamer => {
                    it(`Don't has registered streamer - ${streamer.username}`, () => environnement.adapter.isExistByUsername(streamer.username).then(result => expect(result).equal(false)))
                    it(`Save registered streamer - ${streamer.username}`, () => environnement.adapter.save(streamer).catch(error => { throw error }))
                    it(`Has registered streamer - ${streamer.username}`, () => environnement.adapter.isExistByUsername(streamer.username).then(result => expect(result).equal(true)))
                    it(`retrieveByUsername - ${streamer.username}`, () => environnement.adapter.retrieveByUsername(streamer.username).then(result => expect(result).deep.equal(streamer)))
                })
                it('retrieveAll', () => environnement.adapter.retrieveAll().then(result => expect(result).deep.equal(streamers)))
            })
        })
    })
})
