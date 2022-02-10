import express from 'express'
import { serverApplication } from '../serverApplication'
import { expressCommandApi } from './expressCommandApi'
import { expressListen } from './expressListen'
import { expressQueryApi } from './expressQueryApi'
import { expressStaticFrontEnd } from './expressStaticFrontEnd'
export const backendPort = 8000
const expressApplication = express()

expressCommandApi(expressApplication, serverApplication)
expressQueryApi(expressApplication, serverApplication)
expressStaticFrontEnd(expressApplication)
expressListen(expressApplication, backendPort)
