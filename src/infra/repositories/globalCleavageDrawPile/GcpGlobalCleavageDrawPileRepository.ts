import { Cleavage, CleavageDTO } from '../../../domain/entities/Cleavage'
import type { GlobalCleavageDrawPileRepository } from '../../../domain/ports/secondary/repositories/GlobalCleavageDrawPileRepository'
import type { GcpDatastore } from './GcpDatastore'

export class GcpGlobalCleavageDrawPileRepository implements GlobalCleavageDrawPileRepository {
    constructor (private gcpDatastore:GcpDatastore) {}
    retrieveGlobalCleavageByIndex (globalCleavageIndex: number): Promise<Cleavage> {
        return this.gcpDatastore.retreiveRecordByOffset<CleavageDTO>(this.globalCleavageKind, globalCleavageIndex)
            .then(result => result instanceof Error ? Promise.reject(result) : Promise.resolve(new Cleavage(result)))
            .catch(error => Promise.reject(error))
    }

    globalCleavageQuantity (): Promise<number> {
        return this.gcpDatastore.retreiveRecordQuantity(this.globalCleavageKind)
    }

    save (cleavage: Cleavage): Promise<void> {
        return this.gcpDatastore.saveRecordOnGoogleDatastore(this.globalCleavageGcpPath(cleavage), cleavage.toDto())
            .then(result => result instanceof Error ? Promise.reject(result) : Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    hasCleavage (cleavage: Cleavage): Promise<boolean> {
        return this.gcpDatastore.queryRecordsOnGoogleDatastore<CleavageDTO>(this.globalCleavageKind, [{ property: 'title', operator: '=', value: cleavage.title }])
            .then(result => result instanceof Error ? Promise.resolve(false) : result.length === 1)
            .catch(error => Promise.reject(error))
    }

    deleteGlobalCleavage (cleavage:Cleavage) : Promise<void> {
        return this.gcpDatastore.deleteRecordOnGoogleDatastore(this.globalCleavageGcpPath(cleavage))
            .then(result => result instanceof Error ? Promise.reject(result) : Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    private globalCleavageGcpPath (cleavage: Cleavage): string[] {
        return [this.globalCleavageKind, cleavage.title]
    }

    private globalCleavageKind = 'globalCleavage'
}
