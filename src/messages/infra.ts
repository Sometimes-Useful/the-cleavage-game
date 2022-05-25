import type { Operator, Query } from '@google-cloud/datastore/build/src/query'
import type { GcpDatastoreInteractorConfiguration } from '../infra/tech/GcpDatastore'

export const nexAutoplayDateIsUndefined = 'next autoplay date is undefined.'
export const gcpBadConfiguration = (gcpConfig:GcpDatastoreInteractorConfiguration) => `gcpDatastoreInteractorConfiguration bad configuration : ${JSON.stringify(gcpConfig)}`

export const saveRecordStart = (path: string): string => `⚙️  saveRecordOnGoogleDatastore - ${path}`
export const saveRecordSuccess = (path: string): string => `✔️  Entity with key path '${path}' saved on datastore.`
export const saveRecordError = (error: Error): string => `❌  ${error.message}`

export const deleteRecordStart = (path: string): string => `⚙️  deleteRecordOnGoogleDatastore - ${path}`
export const deleteRecordSuccess = (path: string): string => `✔️  Entity with key path '${path}' deleted on datastore.`
export const deleteRecordError = (error: Error): string => `❌  ${error.message}`

export const retreiveRecordStart = (path: string): string => `⚙️  retreiveRecordOnGoogleDatastore - ${path}`
export const retreiveRecordSuccess = (path: string, entity:unknown): string => `✔️  Entity with key path '${path}' retreived from datastore: ${JSON.stringify(entity)}`
export const retreiveRecordError = (error: Error): string => `❌ ${error.message}`

export const queryAllRecordsStart = (kind: string): string => `⚙️  queryAllRecordsOnGoogleDatastore - ${kind} `
export const queryAllRecordsSuccess = <T> (entities: T[], kind: string): string => `✔️  ${entities.length} entities retrieved on kind '${kind}'.`

export const queryRecordsStart = (kind: string): string => `⚙️  queryRecordsOnGoogleDatastore - ${kind} `
export const queryRecordsFilter = (filter: { property: string; operator: Operator; value: {} }): string => `🔎 ${filter.property}${filter.operator}'${filter.value}'`
export const queryRecordsSuccess = <T> (entities: T[], kind: string): string => `✔️  ${entities.length} entities retrieved on kind '${kind}' according to filters.`
export const queryRecordsError = (filter: { property: string; operator: Operator; value: {} }): string => `❌ Filter '${filter.value}' Error`

export const gcpQueryOffsetStart = (query:Query) => `⚙️  GCP Query Start - ${query.kinds} - ${query.offsetVal} - ${query.limitVal}`
export const retreiveRecordByOffsetErrorMultipleEntities = (kind: string, offset: number): string => `❌ Multiple entities of kind '${kind}' at offset '${offset}' ?!`
export const retreiveRecordByOffsetErrorNoEntity = (kind: string, offset: number): string => `❌ No entity of kind '${kind}' at offset '${offset}'`
export const entityRetreivedAtOffset = <T> (entities: T[], query:Query): string => `✔️  ${entities.length} entities retrieved on kind '${query.kinds}' at offset '${query.offsetVal}'.`

export const cleavageUndefined = 'Cleavage is undefined.'
