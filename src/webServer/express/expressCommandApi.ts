import { Express, Response, json } from 'express'
import { Cleavage, CleavageDTO } from '../../domain/entities/Cleavage'
import { SaveCleavageOnGlobalCleavageDrawPileEvent } from '../../domain/events/saveCleavageOnGlobalCleavageDrawPile/SaveCleavageOnGlobalCleavageDrawPileEvent'
import type { ProductionServerApplication } from '../../infra/applications/server/ProductionServerApplication'
import { BACKEND_API_URL } from '../../api/Backend_API_URL'

export function expressCommandApi (app: Express, application: ProductionServerApplication) {
    app.use(json())
    app.post(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_SAVE, (req, res: Response<void | Error>, next) => {
        return application.gateways.event.sendEvent(new SaveCleavageOnGlobalCleavageDrawPileEvent(cleavageDTOFromBody(req.body)))
            .then(result => res.send())
            .catch(error => next(error))
    })
}

const cleavageDTOFromBody = (body:any):Cleavage => {
    const cleavageDTO:CleavageDTO = body
    return new Cleavage(cleavageDTO)
}
