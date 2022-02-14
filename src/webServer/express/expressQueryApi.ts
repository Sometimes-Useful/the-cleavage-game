import type { Express, Response } from 'express'
import { Cleavage, CleavageDTO } from '../../domain/entities/Cleavage'
import type { ProductionServerApplication } from '../../infra/applications/server/ProductionServerApplication'
import { BACKEND_API_URL } from '../../api/Backend_API_URL'

export function expressQueryApi (app: Express, application: ProductionServerApplication) {
    app.get(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_DRAW, (req, res: Response<CleavageDTO | undefined>, next) =>
        application.queryController.drawGlobalCleavageDrawPile()
            .then(result => res.send(result instanceof Cleavage ? result.toDto() : result))
            .catch(error => next(error))
    )
}
