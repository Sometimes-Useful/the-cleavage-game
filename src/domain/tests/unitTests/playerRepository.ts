import { expect } from 'chai'
import { Test, it } from 'mocha'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { Player } from '../../entities/Player'
import type { Gherkin } from '../Gherkin'
import { isGiven } from './unitTests'

export const thePlayerRepositoryDontHavePlayers = (gherkinPrefix: Gherkin, application: FakeClientApplication): Test =>
    it(`${gherkinPrefix} the player repository don't have players.`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.player.currentPlayers = []
        expect(application.repositories.player.currentPlayers).deep.equal([])
    })
export const thePlayerRepositoryHasPlayers = (gherkinPrefix: Gherkin, application: FakeClientApplication, expectedPlayers: Player|Player[]):Test => {
    const players : Player[] = Array.isArray(expectedPlayers) ? expectedPlayers : [expectedPlayers]
    return it(`${gherkinPrefix} the player repository has the following players: ${JSON.stringify(players)}`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.player.currentPlayers = players
        expect(application.repositories.player.currentPlayers).deep.equal(players)
    })
}
