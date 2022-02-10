import { Test, it } from 'mocha'
import { expect } from 'chai'
import type { ApplicationEvent } from '../../events/GameEvent'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { Gherkin } from '../Gherkin'
import { isGiven } from './unitTests'
import type { FakeServerApplication } from '../../../infra/applications/server/FakeServerApplication'
import type { Cleavage } from '../../entities/Cleavage'

export const whenEventOccurs = (application: FakeClientApplication|FakeServerApplication, event: ApplicationEvent): Test =>
    it(`When the event '${event.eventType}' occurs.`, () => application.gateways.event.onEvent(event))

export const whenQueryOccursThenHasResult = (application: FakeServerApplication, expectedResult:Cleavage|undefined): Test =>
    it(whenDrawGlobalCleavageDrawPileOccursMessage(expectedResult), () => application.queryController.drawGlobalCleavageDrawPile()
        .then(result => expect(result).deep.equal(expectedResult))
        .catch(error => { throw error })
    )

export const theEventIsSent = (gherkinPrefix:Gherkin, application:FakeClientApplication, expectedEvents: ApplicationEvent | ApplicationEvent[]):Test => {
    const events : ApplicationEvent[] = Array.isArray(expectedEvents) ? expectedEvents : [expectedEvents]
    return it(`${gherkinPrefix} the event gateway has events '${JSON.stringify(events)}'.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.event.events = events
        expect(application.gateways.event.events).deep.equal(events)
    })
}
const whenDrawGlobalCleavageDrawPileOccursMessage = (expectedResult:Cleavage|undefined): string =>
    `When the query draw global cleavage draw pile occurs.
    Then the event has result: ${expectedResult}`
