import { expect } from 'chai'
import { Test, it } from 'mocha'
import { Gherkin } from '../Gherkin'
import type { FakeApplication } from '../../../infra/applications/FakeApplication'
import type { Player } from '../../entities/Player'

export const thePlayerRepositoryDontHavePlayers = (gherkinPrefix: Gherkin, application: FakeApplication): Test =>
    it(`${gherkinPrefix} the player repository don't have players.`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN)
            application.repositories.player.currentPlayers = []
        expect(application.repositories.player.currentPlayers).deep.equal([])
    })
export const thePlayerRepositoryHasPlayers = (gherkinPrefix: Gherkin, application: FakeApplication, expectedPlayers: Player|Player[]):Test => {
    const players : Player[] = Array.isArray(expectedPlayers) ? expectedPlayers : [expectedPlayers]
    return it(`${gherkinPrefix} the player repository has the following players: ${JSON.stringify(players)}`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) application.repositories.player.currentPlayers = players
        expect(application.repositories.player.currentPlayers).deep.equal(players)
    })
}
