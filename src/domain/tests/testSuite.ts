
import type { Suite } from 'mocha'
import type { FakeClientApplication } from '../../infra/applications/client/FakeApplication'
import type { FakeServerApplication } from '../../infra/applications/server/FakeServerApplication'
import type { ClientUnitTest, ServerUnitTest } from './unitTests/unitTests'

export const clientTestSuite = (application: FakeClientApplication, unitTests: ClientUnitTest[]): (this: Suite) => void => () => unitTests.forEach(unitTest => unitTest(application))
export const serverTestSuite = (application: FakeServerApplication, unitTests: ServerUnitTest[]): (this: Suite) => void => () => unitTests.forEach(unitTest => unitTest(application))
