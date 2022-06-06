import express, { json, Response } from 'express'
import { BACKEND_API_URL } from '../api/Backend_API_URL'
import { Cleavage, type CleavageDTO } from '../domain/entities/Cleavage'
import type { StreamerDto } from '../domain/entities/StreamerDto'
import { RegisterStreamerServerEvent } from '../domain/events/registerStreamerServer/RegisterStreamerServerEvent'
import { SaveCleavageOnGlobalCleavageDrawPileEvent } from '../domain/events/saveCleavageOnGlobalCleavageDrawPile/SaveCleavageOnGlobalCleavageDrawPileEvent'
import type { ProductionServerApplication } from '../infra/applications/server/ProductionServerApplication'
import type { Server } from 'http'
import { indexHtmlFilePath, publicFolderPath } from '../infra/tech/paths'

export class WebServer {
    constructor (
        private serverApplication: ProductionServerApplication
    ) { }

    start (sheme: string, fqdn: string, port?: string): Promise<void> {
        if (this.webServer)
            return Promise.reject(new Error('Server already started.'))
        this.loadCommandApis()
        this.loadQueryApis()
        this.loadStatic()
        this.webServer = this.expressInstance.listen(port)
        this.webServer.on('listening', () => console.log(`⚡️[webServer]: Server is running at ${sheme}://${fqdn}${port ? `:${port}` : ''}`))
        this.webServer.on('close', () => console.log('⚡️[webserver]: Server is closed'))
        return Promise.resolve()
    }

    stop (): Promise<void> {
        return new Promise<void>((resolve, reject) => this.webServer
            ? this.webServer.close((error) => error ? reject(error) : resolve())
            : reject(new Error('Server is not started.'))
        )
    }

    private loadCommandApis () {
        this.expressInstance.use(json())
        this.expressInstance.post(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_SAVE, (req, res: Response<void | Error>, next) => {
            return this.serverApplication.gateways.event.sendEvent(new SaveCleavageOnGlobalCleavageDrawPileEvent(this.cleavageDTOFromBody(req.body)))
                .then(result => res.send())
                .catch(error => next(error))
        })
        this.expressInstance.post(BACKEND_API_URL.STREAMERS, (req, res: Response<void | Error>, next) => {
            return this.serverApplication.gateways.event.sendEvent(new RegisterStreamerServerEvent(req.body))
                .then(result => res.send())
                .catch(error => next(error))
        })
    }

    private loadQueryApis () {
        this.expressInstance.get(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_DRAW, (req, res: Response<CleavageDTO | undefined>, next) => this.serverApplication.queryController.drawGlobalCleavageDrawPile()
            .then(result => res.send(result instanceof Cleavage ? result.toDto() : result))
            .catch(error => {
                console.log(error)
                return next(error)
            })
        )
        this.expressInstance.get(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_QUANTITY, (req, res: Response<string>, next) => this.serverApplication.queryController.retrieveCleavageDrawpileQuantity()
            .then(result => res.send(result.toString()))
            .catch(error => {
                console.log(error)
                return next(error)
            })
        )
        this.expressInstance.get(`${BACKEND_API_URL.STREAMERS}`, (req, res: Response<StreamerDto[]>, next) =>
            this.serverApplication.queryController.retrieveAllRegisteredStreamers()
                .then(result => res.send(result))
                .catch(error => {
                    console.log(error)
                    return next(error)
                })
        )
        this.expressInstance.get(`${BACKEND_API_URL.STREAMERS}/:username`, (req, res: Response<StreamerDto>, next) =>
            this.serverApplication.queryController.retrieveRegisteredStreamerByUsername(req.params.username)
                .then(result => res.send(result))
                .catch(error => {
                    console.log(error)
                    return next(error)
                })
        )
    }

    private loadStatic () {
        this.expressInstance.get('/', express.static(indexHtmlFilePath))
        this.expressInstance.use('/', express.static(publicFolderPath))
    }

    private cleavageDTOFromBody = (body: any): Cleavage => {
        const cleavageDTO: CleavageDTO = body
        return new Cleavage(cleavageDTO)
    };

    private expressInstance = express();
    private webServer: Server | undefined = undefined;
}
