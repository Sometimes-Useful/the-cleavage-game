import { expect } from 'chai'
import { after, before, describe, it } from 'mocha'
import type { GlobalCleavageDrawPileGateway } from '../../../domain/ports/secondary/gateways/GlobalCleavageDrawPileGateway'
import { commonCleavage1 } from '../../../domain/tests/testContexts'
import { backendFqdn, backendPort, backendSheme } from '../../../env/serverEnvironnementVariables'
import { serverApplication } from '../../../serverApplication'
import { WebServer } from '../../../webServer/WebServer'
import { AxiosBackendInstance } from '../../tech/AxiosBackendInstance'
import { AxiosGlobalCleavageDrawPileGateway } from './AxiosGlobalCleavageDrawPileGateway'
import { FakeGlobalCleavageDrawPileGateway } from './FakeGlobalCleavageDrawPileGateway'

interface IntegrationEnvironnement {
    adapter: GlobalCleavageDrawPileGateway
}
const fake:IntegrationEnvironnement = {
    adapter: new FakeGlobalCleavageDrawPileGateway()
}
const axiosBackendInstance = new AxiosBackendInstance({ sheme: backendSheme, endpoint: backendFqdn, port: backendPort })

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
            if (environnement.adapter.constructor.name === AxiosGlobalCleavageDrawPileGateway.name) {
                const webServer = new WebServer(serverApplication)
                before(() => webServer.start(backendSheme, backendFqdn, backendPort))
                after(() => webServer.stop())
            }
            describe('Nothing > save > one cleavage', () => {
                it('No cleavage on global draw pile', () => environnement.adapter.drawGlobalCleavage().then(result => expect(result).to.be.undefined))
                it('When connect occurs.', () => environnement.adapter.save(commonCleavage1()))
                it('Cleavage on global draw pile', () => environnement.adapter.drawGlobalCleavage().then(result => expect(result).to.be.deep.equal(commonCleavage1())))
            })
        })
    })
})
