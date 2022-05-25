import { Test, it } from 'mocha'
import { expect } from 'chai'
import type { ApplicationEvent } from '../../events/GameEvent'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { Gherkin } from '../Gherkin'
import { isGiven } from './unitTests'
import type { FakeServerApplication } from '../../../infra/applications/server/FakeServerApplication'
import type { Cleavage } from '../../entities/Cleavage'
import type { StreamerDto } from '../../entities/StreamerDto'

export const whenEventOccurs = (event: ApplicationEvent|ApplicationEvent[]) => (application:FakeClientApplication|FakeServerApplication): Test =>
    Array.isArray(event)
        ? it(`When events '${event.map(event => event.eventType)}' occurs.`, () => application.gateways.event.onEvents(event))
        : it(`When the event '${event.eventType}' occurs.`, () => application.gateways.event.onEvent(event))

export const whenQueryDrawGlobalCleavageDrawPileOccursThenHasResult = (expectedResult:Cleavage|undefined) => (application:FakeServerApplication): Test =>
    it(whenDrawGlobalCleavageDrawPileOccursMessage(expectedResult), () => application.queryController.drawGlobalCleavageDrawPile()
        .then(result => expect(result).deep.equal(expectedResult))
        .catch(error => { throw error })
    )
export const whenQueryRetrieveCleavageDrawPileQuantityOccursThenHasResult = (expectedResult:number) => (application:FakeServerApplication): Test =>
    it(whenQueryRetrieveCleavageDrawPileQuantityOccursThenHasResultMessage(expectedResult), () => application.queryController.retrieveCleavageDrawpileQuantity()
        .then(result => expect(result).deep.equal(expectedResult))
        .catch(error => { throw error })
    )

export const theEventIsSent = (gherkinPrefix:Gherkin, expectedEvents: ApplicationEvent | ApplicationEvent[]) => (application:FakeClientApplication):Test => {
    const events : ApplicationEvent[] = Array.isArray(expectedEvents) ? expectedEvents : [expectedEvents]
    return it(`${gherkinPrefix} the event gateway has events '${JSON.stringify(events)}'.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.event.events = events
        expect(application.gateways.event.events).deep.equal(events)
    })
}
const whenDrawGlobalCleavageDrawPileOccursMessage = (expectedResult:Cleavage|undefined): string =>
    `When the query draw global cleavage draw pile occurs.
    Then the query has result: ${expectedResult}`
const whenQueryRetrieveCleavageDrawPileQuantityOccursThenHasResultMessage = (expectedResult:number): string =>
    `When the query retrieve global cleavage draw pile quantity occurs.
    Then the query has result: ${expectedResult}`

export const whenRetreiveStreamerOccursThenHasResult = (username:string, expectedResult:StreamerDto|undefined) => (application: FakeServerApplication): Test =>
    it(whenQueryRetreiveStreamerOccursThenHasResultMessage(username, expectedResult), () => application.queryController.retrieveRegisteredStreamerByUsername(username)
        .then(result => expect(result).deep.equal(expectedResult))
        .catch(error => { throw error })
    )
const whenQueryRetreiveStreamerOccursThenHasResultMessage = (username:string, expectedResult:StreamerDto|undefined): string =>
    `When the query retrieve streamer by username ${username} occurs.
    Then the query has result: ${expectedResult}`

export const whenRetreiveStreamersOccursThenHasResult = (expectedResult:StreamerDto[]) => (application: FakeServerApplication): Test =>
    it(whenQueryRetreiveStreamersOccursThenHasResultMessage(expectedResult), () => application.queryController.retrieveAllRegisteredStreamers()
        .then(result => expect(result).deep.equal(expectedResult))
        .catch(error => { throw error })
    )

const whenQueryRetreiveStreamersOccursThenHasResultMessage = (expectedResult:StreamerDto[]): string =>
    `When the query retrieve streamers occurs.
    Then the query has result: ${expectedResult}`
