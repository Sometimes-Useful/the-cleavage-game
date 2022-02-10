import type { Express, Response } from 'express'
import type { Cleavage } from '../domain/entities/Cleavage'
import type { ProductionServerApplication } from '../infra/applications/server/ProductionServerApplication'
import { BACKEND_API_URL } from './Backend_API_URL'

export function expressQueryApi (app: Express, application: ProductionServerApplication) {
    app.get(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_DRAW, (req, res: Response<Cleavage | undefined>, next) => {
        return application.queryController.drawGlobalCleavageDrawPile()
            .then(result => res.send(result))
            .catch(error => next(error))
    })
}
