import { Express, Response, json } from 'express'
import { Cleavage } from '../domain/entities/Cleavage'
import type { Player } from '../domain/entities/Player'
import { SaveCleavageOnGlobalCleavageDrawPileEvent } from '../domain/events/saveCleavageOnGlobalCleavageDrawPile/SaveCleavageOnGlobalCleavageDrawPileEvent'
import type { ProductionServerApplication } from '../infra/applications/server/ProductionServerApplication'
import { BACKEND_API_URL } from './Backend_API_URL'

export function expressCommandApi (app: Express, application: ProductionServerApplication) {
    app.use(json())
    app.post(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_SAVE, (req, res: Response<void | Error>, next) => {
        return cleavageFromBody(req.body)
            .then(cleavage => application.gateways.event.sendEvent(new SaveCleavageOnGlobalCleavageDrawPileEvent(cleavage)))
            .then(result => res.send())
            .catch(error => next(error))
    })
}

interface CleavageDTO {
    title: string,
    leftChoice: {
        name: string,
        players: Player[]
    },
    rightChoice: {
        name: string,
        players: Player[]
    },
    players: Player[]
}

const cleavageFromBody = (body:any):Promise<Cleavage> => {
    const cleavageDTO:CleavageDTO = body
    const cleavage = new Cleavage(cleavageDTO.title, cleavageDTO.leftChoice, cleavageDTO.rightChoice, cleavageDTO.players)
    return Promise.resolve(cleavage)
}
