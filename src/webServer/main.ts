import { config } from 'dotenv'
import express from 'express'
import { backendFqdn, backendPort, backendSheme } from '../api/backendEnv'
import { EnvironmentVariable } from '../infra/EnvironmentVariable'
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
    backendSheme(process.env.BACKEND_SHEME, EnvironmentVariable.BACKEND_SHEME),
    backendFqdn(process.env.BACKEND_FQDN, EnvironmentVariable.BACKEND_FQDN),
    backendPort(process.env.PORT, EnvironmentVariable.BACKEND_PORT)
)
