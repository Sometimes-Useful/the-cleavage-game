import { expect } from 'chai'
import { after, before, describe, it } from 'mocha'
import type { GlobalCleavageDrawPileGateway } from '../../../domain/ports/secondary/gateways/GlobalCleavageDrawPileGateway'
import { commonCleavage1 } from '../../../domain/tests/testContexts'
import { backendFqdn, backendPort, backendSheme } from '../../../env/serverEnvironnementVariables'
import { WebServer } from '../../../webServer/WebServer'
import { ProductionServerApplication } from '../../applications/server/ProductionServerApplication'
import { InMemoryGlobalCleavageDrawPileRepository } from '../../repositories/globalCleavageDrawPile/InMemoryGlobalCleavageRepository'
import { InMemoryGlobalRegisteredStreamersRepository } from '../../repositories/registeredStreamers/InMemoryRegisteredStreamersRepository'
import { AxiosBackendInstance } from '../../tech/AxiosBackendInstance'
import { InMemoryProductionServerEventGateway } from '../event/InMemoryProductionServerEventGateway'
import { FakeRandomGateway } from '../random/FakeRandomGateway'
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
                const webServer = new WebServer(new ProductionServerApplication(
                    {
                        event: new InMemoryProductionServerEventGateway(),
                        random: new FakeRandomGateway()
                    },
                    {
                        globalCleavageDrawPileRepository: new InMemoryGlobalCleavageDrawPileRepository(),
                        globalRegisteredStreamers: new InMemoryGlobalRegisteredStreamersRepository()
                    }))
                before(() => webServer.start(backendSheme, backendFqdn, backendPort))
                after(() => webServer.stop())
            }
            describe('Nothing > save > one cleavage', () => {
                it('Retreive cleavage drawpile quantity : 0', () => environnement.adapter.retrieveCleavageDrawpileQuantity().then(result => expect(result).equal(0)))
                it('No cleavage on global draw pile', () => environnement.adapter.drawGlobalCleavage().then(result => expect(result).to.be.undefined))
                it('Save cleavage on drawpile', () => environnement.adapter.save(commonCleavage1()))
                it('Retreive cleavage drawpile quantity : 1', () => environnement.adapter.retrieveCleavageDrawpileQuantity().then(result => expect(result).equal(1)))
                it('Cleavage on global draw pile', () => environnement.adapter.drawGlobalCleavage().then(result => expect(result).to.be.deep.equal(commonCleavage1())))
            })
        })
    })
})
