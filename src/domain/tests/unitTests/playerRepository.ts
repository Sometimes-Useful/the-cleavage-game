import { expect } from 'chai'
import { Test, it } from 'mocha'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { Player } from '../../entities/Player'
import type { Gherkin } from '../Gherkin'
import { detailedComparisonMessage, isGiven } from './unitTests'

export const thePlayerRepositoryDontHavePlayers = (gherkinPrefix: Gherkin, application: FakeClientApplication): Test =>
    it(`${gherkinPrefix} the player repository don't have players.`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.player.currentPlayers = new Map()
        expect(application.repositories.player.currentPlayers).deep.equal(new Map(), detailedComparisonMessage(application.repositories.player.currentPlayers, new Map()))
    })
export const thePlayerRepositoryHasPlayers = (gherkinPrefix: Gherkin, application: FakeClientApplication, expectedPlayers: Player[]):Test => {
    const players = new Map()
    expectedPlayers.forEach(player => players.set(player.username, player))
    return it(`${gherkinPrefix} the player repository has the following players: ${JSON.stringify(expectedPlayers)}`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.player.currentPlayers = players
        expect(application.repositories.player.currentPlayers).deep.equal(players, detailedComparisonMessage(application.repositories.player.currentPlayers, players))
    })
}
