import { describe, it } from 'mocha'
import { expect } from 'chai'
import type { GlobalCleavageDrawPileGateway } from '../../../domain/ports/secondary/gateways/GlobalCleavageDrawPileGateway'
import { AxiosGlobalCleavageDrawPileGateway } from './AxiosGlobalCleavageDrawPileGateway'
import { FakeGlobalCleavageDrawPileGateway } from './FakeGlobalCleavageDrawPileGateway'
import { commonCleavage1 } from '../../../domain/tests/testContexts'
// import { clientBackendFqdn, clientBackendPort, clientBackendSheme } from '../../../env/clientEnvironnementVariables'
import { AxiosBackendInstance } from '../../tech/AxiosBackendInstance'

interface IntegrationEnvironnement {
    adapter: GlobalCleavageDrawPileGateway
}
const fake:IntegrationEnvironnement = {
    adapter: new FakeGlobalCleavageDrawPileGateway()
}
const axiosBackendInstance = new AxiosBackendInstance(undefined
    // { sheme: clientBackendSheme, endpoint: clientBackendFqdn, port: clientBackendPort }
)

const axios:IntegrationEnvironnement = {
    adapter: new AxiosGlobalCleavageDrawPileGateway(axiosBackendInstance)
}

const envs = [
    fake,
    axios
]
describe('Integration Test - Global Cleavage Draw Pile Gateway', () => {
    envs.forEach(environnement => {
        describe(`${environnement.adapter.constructor.name}`, () => {
            describe('Nothing > save > one cleavage', () => {
                it('No cleavage on global draw pile', () => environnement.adapter.drawGlobalCleavage().then(result => expect(result).to.be.undefined))
                it('When connect occurs.', () => environnement.adapter.save(commonCleavage1()))
                it('Cleavage on global draw pile', () => environnement.adapter.drawGlobalCleavage().then(result => expect(result).to.be.deep.equal(commonCleavage1())))
            })
        })
    })
})
