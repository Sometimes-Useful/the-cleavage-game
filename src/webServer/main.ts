import { config } from 'dotenv'
import express from 'express'
import { backendFqdn, backendPort, backendSheme } from '../env/serverEnvironnementVariables'
import { serverApplication } from '../serverApplication'
import { expressCommandApi } from './express/expressCommandApi'
import { expressListen } from './express/expressListen'
import { expressQueryApi } from './express/expressQueryApi'
import { expressStaticFrontEnd } from './express/expressStaticFrontEnd'
config()
const expressApplication = express()
expressCommandApi(expressApplication, serverApplication)
expressQueryApi(expressApplication, serverApplication)
expressStaticFrontEnd(expressApplication)
expressListen(
    expressApplication,
    backendSheme, backendFqdn, backendPort
)
