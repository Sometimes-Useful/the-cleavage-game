import { Datastore } from '@google-cloud/datastore'
import type { Entities, Entity } from '@google-cloud/datastore/build/src/entity'
import type { Operator, RunQueryResponse } from '@google-cloud/datastore/build/src/query'
import { deleteRecordError, deleteRecordStart, deleteRecordSuccess, entityRetreivedAtOffset, gcpBadConfiguration, gcpQueryOffsetStart as gcpQueryOffSetStart, queryRecordsError, queryRecordsFilter, queryRecordsStart, queryRecordsSuccess, retreiveRecordByOffsetErrorMultipleEntities, retreiveRecordByOffsetErrorNoEntity, retreiveRecordError, retreiveRecordStart, retreiveRecordSuccess, saveRecordError, saveRecordStart, saveRecordSuccess } from '../../../messages/infra'
export interface GcpDatastoreInteractorConfiguration {
    gcpProjectId:string|undefined, gcpClientEmail:string|undefined, gcpPrivateKey:string|undefined, gcpKindPrefix:string|undefined
}

export interface GcpQueryFilter {
    property: string,
    operator: Operator,
    value: {}
}

export class GcpDatastore {
    constructor (gcpDatastoreInteractorConfiguration:GcpDatastoreInteractorConfiguration) {
        if (
            gcpDatastoreInteractorConfiguration.gcpClientEmail === undefined ||
            gcpDatastoreInteractorConfiguration.gcpPrivateKey === undefined ||
            gcpDatastoreInteractorConfiguration.gcpProjectId === undefined ||
            gcpDatastoreInteractorConfiguration.gcpKindPrefix === undefined
        ) throw new Error(gcpBadConfiguration(gcpDatastoreInteractorConfiguration))
        this.kindPrefix = gcpDatastoreInteractorConfiguration.gcpKindPrefix
        this.gcpDatastore = new Datastore({
            projectId: gcpDatastoreInteractorConfiguration.gcpProjectId,
            credentials: {
                client_email: gcpDatastoreInteractorConfiguration.gcpClientEmail,
                private_key: gcpDatastoreInteractorConfiguration.gcpPrivateKey
            }
        })
    }

    public retreiveRecordByOffset<T> (kind: string, offset: number):Promise<T|Error> {
        const query = this.gcpDatastore.createQuery(this.kindPrefix.concat(kind)).offset(offset).limit(1)
        console.log(gcpQueryOffSetStart(query))
        return this.gcpDatastore.runQuery(query)
            .then(queryResponse => {
                const entities:T[] = queryResponse[0]
                console.log(entityRetreivedAtOffset<T>(entities, query))
                return entities.length === 1
                    ? entities[0]
                    : entities.length === 0
                        ? new Error(retreiveRecordByOffsetErrorNoEntity(kind, offset))
                        : new Error(retreiveRecordByOffsetErrorMultipleEntities(kind, offset))
            })
            .catch(error => Promise.reject(error))
    }

    public retreiveRecordQuantity (kind:string): Promise<number> {
        const query = this.gcpDatastore.createQuery(this.kindPrefix.concat(kind))
        query.select('__key__')
        return this.gcpDatastore.runQuery(query)
            .then(queryResponse => Promise.resolve(queryResponse[0].length))
            .catch(error => Promise.reject(error))
    }

    public queryRecordsOnGoogleDatastore<T> (kind:string, filters:GcpQueryFilter[]):Promise<T[]|Error> {
        kind = this.kindPrefix.concat(kind)
        console.log(queryRecordsStart(kind))
        const query = this.gcpDatastore.createQuery(kind)
        filters.forEach(filter => {
            console.log(queryRecordsFilter(filter))
            query.filter(filter.property, filter.operator, filter.value)
        })
        return query.run()
            .then((queryResponse:RunQueryResponse) => {
                const entities:T[] = queryResponse[0]
                filters.forEach(filter => { if (filter.value === 'ERROR') throw new Error(queryRecordsError(filter)) })
                console.log(queryRecordsSuccess<T>(entities, kind))
                return entities
            })
            .catch(error => error)
    }

    public retreiveRecordOnGoogleDatastore (gcpEntitypath:string[]):Promise<Entities|Error> {
        const path = this.kindPrefix.concat(gcpEntitypath.join(this.keyPathSeparator))
        console.log(retreiveRecordStart(path))
        return this.gcpDatastore.get(this.gcpDatastore.key({ path: path.split(this.keyPathSeparator) }))
            .then(result => {
                console.log(retreiveRecordSuccess(path))
                return Promise.resolve(result[0])
            })
            .catch(error => {
                console.log(retreiveRecordError(error))
                return Promise.resolve(error)
            })
    }

    public deleteRecordOnGoogleDatastore (gcpEntitypath:string[]):Promise<void|Error> {
        const path = this.kindPrefix.concat(gcpEntitypath.join(this.keyPathSeparator))
        console.log(deleteRecordStart(path))
        return this.gcpDatastore.delete(this.gcpDatastore.key({ path: path.split(this.keyPathSeparator) }))
            .then(result => {
                console.log(deleteRecordSuccess(path))
                return Promise.resolve()
            })
            .catch(error => {
                console.log(deleteRecordError(error))
                return Promise.resolve(error)
            })
    }

    public saveRecordOnGoogleDatastore (gcpEntitypath:string[], entity:Entity):Promise<void|Error> {
        const path = this.kindPrefix.concat(gcpEntitypath.join(this.keyPathSeparator))
        console.log(saveRecordStart(path))
        return this.gcpDatastore.save({ key: this.gcpDatastore.key({ path: path.split(this.keyPathSeparator) }), data: entity })
            .then(response => {
                console.log(saveRecordSuccess(path))
                return Promise.resolve()
            })
            .catch(error => {
                console.log(saveRecordError(error))
                return Promise.resolve(error)
            })
    }

    private kindPrefix:string
    private keyPathSeparator = '/'
    private gcpDatastore:Datastore
}
