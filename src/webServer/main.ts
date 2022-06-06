import { backendSheme, backendFqdn, backendPort } from '../env/serverEnvironnementVariables'
import { serverApplication } from '../serverApplication'
import { WebServer } from './WebServer'

const webServer = new WebServer(serverApplication)
webServer.start(backendSheme, backendFqdn, backendPort)
process.on('SIGINT', () => webServer.stop())
process.on('SIGTERM', () => webServer.stop())
