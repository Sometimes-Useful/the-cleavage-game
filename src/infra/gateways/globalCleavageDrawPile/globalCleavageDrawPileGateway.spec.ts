import { describe, it } from 'mocha'
import { expect } from 'chai'
import type { GlobalCleavageDrawPileGateway } from '../../../domain/ports/secondary/gateways/GlobalCleavageDrawPileGateway'
import { AxiosGlobalCleavageDrawPileGateway } from './AxiosGlobalCleavageDrawPileGateway'
import { FakeGlobalCleavageDrawPileGateway } from './FakeGlobalCleavageDrawPileGateway'
import { commonCleavage1 } from '../../../domain/tests/testContexts'
import { backendFqdn, backendPort, backendSheme } from '../../../api/backendEnv'
import { EnvironmentVariable } from '../../EnvironmentVariable'

interface IntegrationEnvironnement {
    adapter: GlobalCleavageDrawPileGateway
}
const fake:IntegrationEnvironnement = {
    adapter: new FakeGlobalCleavageDrawPileGateway()
}
const axios:IntegrationEnvironnement = {
    adapter: new AxiosGlobalCleavageDrawPileGateway(
        backendSheme(process.env.BACKEND_SHEME, EnvironmentVariable.BACKEND_SHEME),
        backendFqdn(process.env.BACKEND_FQDN, EnvironmentVariable.BACKEND_FQDN),
        backendPort(process.env.PORT, EnvironmentVariable.BACKEND_PORT)
    )
}

const envs = [
    fake,
    axios
]
describe('Integration Test: Global Cleavage Draw Pile Gateway', () => {
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
