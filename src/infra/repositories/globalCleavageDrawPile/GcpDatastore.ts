import { Datastore } from '@google-cloud/datastore'
import type { Entity, entity } from '@google-cloud/datastore/build/src/entity'
import type { Operator, RunQueryResponse } from '@google-cloud/datastore/build/src/query'
export interface GcpDatastoreInteractorConfiguration {
    gcpProjectId:string|undefined, gcpClientEmail:string|undefined, gcpPrivateKey:string|undefined, gcpKindPrefix:string|undefined
}
export class GcpDatastore {
    constructor (gcpDatastoreInteractorConfiguration:GcpDatastoreInteractorConfiguration) {
        if (
            gcpDatastoreInteractorConfiguration.gcpClientEmail === undefined ||
            gcpDatastoreInteractorConfiguration.gcpPrivateKey === undefined ||
            gcpDatastoreInteractorConfiguration.gcpProjectId === undefined ||
            gcpDatastoreInteractorConfiguration.gcpKindPrefix === undefined
        ) throw new Error(`gcpDatastoreInteractorConfiguration bad configuration : ${JSON.stringify(gcpDatastoreInteractorConfiguration)}`)
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
        const query = this.gcpDatastore.createQuery(this.kindPrefix.concat(kind))
        query.offsetVal = offset
        query.limitVal = 1
        return this.gcpDatastore.runQuery(query)
            .then(queryResponse => {
                const entities:T[] = queryResponse[0]
                console.log(`✔️  ${entities.length} entities retrieved on kind '${kind}' at offset '${offset}'.`)
                if (entities.length === 1) return entities[0]
                if (entities.length === 0) return new Error(`No entity of kind '${kind}' at offset '${offset}'`)
                return new Error(`Multiple entities of kind '${kind}' at offset '${offset}' ?!`)
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

    public queryRecordsOnGoogleDatastore<T> (kind:string, filters:{property: string, operator: Operator, value: {}}[]):Promise<T[]|Error> {
        kind = this.kindPrefix.concat(kind)
        console.log(`⚙️  queryRecordsOnGoogleDatastore - ${kind} `)
        const query = this.gcpDatastore.createQuery(kind)
        filters.forEach(filter => {
            console.log(`⚙️  ${filter.property}${filter.operator}${filter.value}`)
            query.filter(filter.property, filter.operator, filter.value)
        })
        return query.run()
            .then((queryResponse:RunQueryResponse) => {
                const entities:T[] = queryResponse[0]
                filters.forEach(filter => { if (filter.value === 'ERROR') throw new Error(`Filter ${filter.value} Error`) })
                console.log(`✔️  ${entities.length} entities retrieved on kind ${kind} according to filters.`)
                return entities
            })
            .catch(error => error)
    }

    public retreiveRecordOnGoogleDatastore (path:string[]):Promise<object|Error> {
        return new Promise<object|Error>((resolve) => {
            const keyPathString = this.kindPrefix.concat(path.join(this.keyPathSeparator))
            console.log(`⚙️  retreiveRecordOnGoogleDatastore - ${keyPathString}`)
            const pathTypes:string[] = keyPathString.split(this.keyPathSeparator)
            const keyOption:entity.KeyOptions = { path: pathTypes }
            const key = this.gcpDatastore.key(keyOption)
            this.gcpDatastore.get(key, (error, entity) => {
                if (error) {
                    console.log(`❌ ${error.message}`)
                    resolve(error)
                } else {
                    console.log(`✔️  Entity with key path ${keyPathString} retreived from datastore.`)
                    return resolve(entity)
                }
            })
        })
    }

    public deleteRecordOnGoogleDatastore (path:string[]):Promise<void|Error> {
        return new Promise<void|Error>((resolve) => {
            const keyPathString = this.kindPrefix.concat(path.join(this.keyPathSeparator))
            console.log(`⚙️  deleteRecordOnGoogleDatastore - ${keyPathString}`)
            const keyOption:entity.KeyOptions = { path: keyPathString.split(this.keyPathSeparator) }
            const key = this.gcpDatastore.key(keyOption)
            this.gcpDatastore.delete(key, (error) => {
                if (error) {
                    console.log(`❌  ${error.message}`)
                    resolve(error)
                } else {
                    console.log(`✔️  Entity with key path ${keyPathString} deleted on datastore.`)
                    resolve()
                }
            })
        })
    }

    public saveRecordOnGoogleDatastore (path:string[], entity:Entity):Promise<void|Error> {
        return new Promise<void|Error>((resolve) => {
            const keyPathString = this.kindPrefix.concat(path.join(this.keyPathSeparator))
            console.log(`⚙️  saveRecordOnGoogleDatastore - ${keyPathString}`)
            const keyOption:entity.KeyOptions = { path: keyPathString.split(this.keyPathSeparator) }
            const key = this.gcpDatastore.key(keyOption)
            const callback = (error?:Error) => {
                if (error) {
                    console.log(`❌  ${error.message}`)
                    resolve(error)
                } else {
                    console.log(`✔️  Entity with key path ${keyPathString} saved on datastore.`)
                    resolve()
                }
            }
            this.gcpDatastore.save({ key, data: entity }, () => callback())
        })
    }

    private kindPrefix:string
    private keyPathSeparator = '/'
    private gcpDatastore:Datastore
}
// const noEntityWithPathErrorMessage = (keyPath:string):string => `No entity with path ${keyPath}`
