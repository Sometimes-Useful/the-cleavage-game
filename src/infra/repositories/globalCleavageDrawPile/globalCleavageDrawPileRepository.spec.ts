import { describe, it, before } from 'mocha'
import { expect } from 'chai'
import { commonCleavage1 } from '../../../domain/tests/testContexts'
import type { GlobalCleavageDrawPileRepository } from '../../../domain/ports/secondary/repositories/GlobalCleavageDrawPileRepository'
import { InMemoryGlobalCleavageDrawPileRepository } from './InMemoryGlobalCleavageRepository'
import { GcpGlobalCleavageDrawPileRepository } from './GcpGlobalCleavageDrawPileRepository'
import { GcpDatastore } from './GcpDatastore'
import { gcpClientEmail, gcpPrivateKey, gcpProjectId } from '../../../env/serverEnvironnementVariables'

interface IntegrationEnvironnement {
    adapter: GlobalCleavageDrawPileRepository
}
const fake:IntegrationEnvironnement = {
    adapter: new InMemoryGlobalCleavageDrawPileRepository()
}
const gcp:IntegrationEnvironnement = {
    adapter: new GcpGlobalCleavageDrawPileRepository(new GcpDatastore({ gcpProjectId, gcpClientEmail, gcpPrivateKey, gcpKindPrefix: 'INT' }))
}

const envs = [
    fake,
    gcp
]
describe('Integration Test: Global Cleavage Draw Pile Repository', () => {
    envs.forEach(environnement => {
        describe(`${environnement.adapter.constructor.name}`, () => {
            describe('Nothing > save > one cleavage', () => {
                before(() => {
                    if (environnement.adapter.constructor.name === GcpGlobalCleavageDrawPileRepository.name) {
                        const adapter = environnement.adapter as GcpGlobalCleavageDrawPileRepository
                        return adapter.deleteGlobalCleavage(commonCleavage1())
                    }
                })
                it('0 cleavages', () => environnement.adapter.globalCleavageQuantity().then(result => expect(result).equal(0)))
                it("Don't has cleavage", () => environnement.adapter.hasCleavage(commonCleavage1()).then(result => expect(result).equal(false)))
                it('Save cleavage', () => environnement.adapter.save(commonCleavage1()).catch(error => { throw error }))
                it('1 cleavage', () => environnement.adapter.globalCleavageQuantity().then(result => expect(result).equal(1)))
                it('Has cleavage', () => environnement.adapter.hasCleavage(commonCleavage1()).then(result => expect(result).equal(true)))
                it('retrieveCleavage', () => environnement.adapter.retrieveGlobalCleavageByIndex(0).then(result => expect(result).deep.equal(commonCleavage1())))
            })
        })
    })
})
