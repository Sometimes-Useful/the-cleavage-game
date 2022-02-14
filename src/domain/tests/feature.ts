import { describe, Suite } from 'mocha'
import type { EventType } from '../events/EventType'

export const feature = (eventType: EventType, scenarios: (() => void | Suite)[]) => describe(`Feature: ${eventType}`, () => scenarios.forEach(scenario => scenario()))
