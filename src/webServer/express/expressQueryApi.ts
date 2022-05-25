import type { Express, Response } from 'express'
import { Cleavage, CleavageDTO } from '../../domain/entities/Cleavage'
import type { ProductionServerApplication } from '../../infra/applications/server/ProductionServerApplication'
import { BACKEND_API_URL } from '../../api/Backend_API_URL'
import type { StreamerDto } from '../../domain/entities/StreamerDto'

export function expressQueryApi (app: Express, application: ProductionServerApplication) {
    app.get(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_DRAW, (req, res: Response<CleavageDTO | undefined>, next) =>
        application.queryController.drawGlobalCleavageDrawPile()
            .then(result => res.send(result instanceof Cleavage ? result.toDto() : result))
            .catch(error => {
                console.log(error)
                return next(error)
            })
    )
    app.get(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_QUANTITY, (req, res: Response<string>, next) =>
        application.queryController.retrieveCleavageDrawpileQuantity()
            .then(result => res.send(result.toString()))
            .catch(error => {
                console.log(error)
                return next(error)
            })
    )
    app.get(`${BACKEND_API_URL.STREAMERS}`, (req, res: Response<StreamerDto[]>, next) =>
        application.queryController.retrieveAllRegisteredStreamers()
            .then(result => res.send(result))
            .catch(error => {
                console.log(error)
                return next(error)
            })
    )
    app.get(`${BACKEND_API_URL.STREAMERS}/:username`, (req, res: Response<StreamerDto>, next) =>
        application.queryController.retrieveRegisteredStreamerByUsername(req.params.username)
            .then(result => res.send(result))
            .catch(error => {
                console.log(error)
                return next(error)
            })
    )
}
