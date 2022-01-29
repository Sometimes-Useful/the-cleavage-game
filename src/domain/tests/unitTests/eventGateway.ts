import { Test, it } from 'mocha'
import type { ApplicationEvent } from '../../events/GameEvent'
import type { FakeApplication } from '../../../infra/applications/FakeApplication'
import { expect } from 'chai'
import { Gherkin } from '../Gherkin'

export const whenEventOccurs = (application: FakeApplication, event: ApplicationEvent): Test =>
    it(`When the event '${event.eventType}' occurs.`, () => application.gateways.event.onEvent(event))

export const theEventIsSent = (gherkinPrefix:Gherkin, application:FakeApplication, expectedEvents: ApplicationEvent | ApplicationEvent[]):Test => {
    const events : ApplicationEvent[] = Array.isArray(expectedEvents) ? expectedEvents : [expectedEvents]
    return it(`${gherkinPrefix} the event gateway has events '${JSON.stringify(events)}'.`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) application.gateways.event.events = events
        expect(application.gateways.event.events).deep.equal(events)
    })
}