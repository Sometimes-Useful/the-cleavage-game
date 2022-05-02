import { expect } from 'chai'
import { Test, it } from 'mocha'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { GamePhase } from '../../entities/GamePhase'
import type { Gherkin } from '../Gherkin'
import { isGiven } from './unitTests'

export const theGamePhaseRepositoryHasPhase = (gherkinPrefix:Gherkin, gamePhase:GamePhase) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the game phase repository has phase '${gamePhase}'`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.gamePhase.currentGamePhase = gamePhase
        expect(application.repositories.gamePhase.currentGamePhase).deep.equal(gamePhase)
    })
