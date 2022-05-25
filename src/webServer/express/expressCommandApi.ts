import { Express, json, Response } from 'express'
import { BACKEND_API_URL } from '../../api/Backend_API_URL'
import { Cleavage, CleavageDTO } from '../../domain/entities/Cleavage'
import { RegisterStreamerServerEvent } from '../../domain/events/registerStreamerServer/RegisterStreamerServerEvent'
import { SaveCleavageOnGlobalCleavageDrawPileEvent } from '../../domain/events/saveCleavageOnGlobalCleavageDrawPile/SaveCleavageOnGlobalCleavageDrawPileEvent'
import type { ProductionServerApplication } from '../../infra/applications/server/ProductionServerApplication'

export function expressCommandApi (app: Express, application: ProductionServerApplication) {
    app.use(json())
    app.post(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_SAVE, (req, res: Response<void | Error>, next) => {
        return application.gateways.event.sendEvent(new SaveCleavageOnGlobalCleavageDrawPileEvent(cleavageDTOFromBody(req.body)))
            .then(result => res.send())
            .catch(error => next(error))
    })
    app.post(BACKEND_API_URL.STREAMERS, (req, res: Response<void | Error>, next) => {
        return application.gateways.event.sendEvent(new RegisterStreamerServerEvent(req.body))
            .then(result => res.send())
            .catch(error => next(error))
    })
}

const cleavageDTOFromBody = (body:any):Cleavage => {
    const cleavageDTO:CleavageDTO = body
    return new Cleavage(cleavageDTO)
}
