import express from 'express'
import { backendFqdn, backendPort } from '../api/backendEnv'
import { serverApplication } from '../serverApplication'
import { expressCommandApi } from './express/expressCommandApi'
import { expressListen } from './express/expressListen'
import { expressQueryApi } from './express/expressQueryApi'
import { expressStaticFrontEnd } from './express/expressStaticFrontEnd'
const expressApplication = express()
expressCommandApi(expressApplication, serverApplication)
expressQueryApi(expressApplication, serverApplication)
expressStaticFrontEnd(expressApplication)
expressListen(expressApplication, backendFqdn, backendPort)
