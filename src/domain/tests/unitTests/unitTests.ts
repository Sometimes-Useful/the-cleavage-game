import type { Test } from 'mocha'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { FakeServerApplication } from '../../../infra/applications/server/FakeServerApplication'
import { Gherkin } from '../Gherkin'
export type ClientUnitTest = (application: FakeClientApplication) => Test;
export type ServerUnitTest = (application: FakeServerApplication) => Test;
export const detailedComparisonMessage = (currentValue: any, expectedValue: any): string => `DETAILS\nexpected >>>>>>>> ${stringifyWithDetailledSetAndMap(currentValue)} \nto deeply equal > ${stringifyWithDetailledSetAndMap(expectedValue)} \n`
export const stringifyWithDetailledSetAndMap = (value: any) => JSON.stringify(value, detailledStringifyForSetAndMap)
const mapToObjectLiteral = (value: Map<any, any>): any => Array.from(value).reduce((obj: any, [key, value]) => {
    obj[key] = value
    return obj
}, {})
const detailledStringifyForSetAndMap = (key: string, value: any): any => (value instanceof Set)
    ? [...value.values()]
    : (value instanceof Map) ? mapToObjectLiteral(value) : value
export function isGiven (gherkinPrefix: Gherkin) {
    return gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN
}
