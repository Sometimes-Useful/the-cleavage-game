"use strict";
exports.__esModule = true;
exports.GcpDatastore = void 0;
var datastore_1 = require("@google-cloud/datastore");
var infra_1 = require("../../messages/infra");
var GcpDatastore = /** @class */ (function () {
    function GcpDatastore(gcpDatastoreInteractorConfiguration) {
        this.keyPathSeparator = '/';
        if (gcpDatastoreInteractorConfiguration.gcpClientEmail === undefined ||
            gcpDatastoreInteractorConfiguration.gcpPrivateKey === undefined ||
            gcpDatastoreInteractorConfiguration.gcpProjectId === undefined ||
            gcpDatastoreInteractorConfiguration.gcpKindPrefix === undefined)
            throw new Error((0, infra_1.gcpBadConfiguration)(gcpDatastoreInteractorConfiguration));
        this.kindPrefix = gcpDatastoreInteractorConfiguration.gcpKindPrefix;
        this.gcpDatastore = new datastore_1.Datastore({
            projectId: gcpDatastoreInteractorConfiguration.gcpProjectId,
            credentials: {
                client_email: gcpDatastoreInteractorConfiguration.gcpClientEmail,
                private_key: gcpDatastoreInteractorConfiguration.gcpPrivateKey
            }
        });
    }
    GcpDatastore.prototype.retreiveAll = function (kind) {
        kind = this.kindPrefix.concat(kind);
        console.log((0, infra_1.queryAllRecordsStart)(kind));
        var query = this.gcpDatastore.createQuery(kind);
        return query.run()
            .then(function (queryResponse) {
            var entities = queryResponse[0];
            console.log((0, infra_1.queryAllRecordsSuccess)(entities, kind));
            return entities;
        })["catch"](function (error) { return error; });
    };
    GcpDatastore.prototype.retreiveRecordByOffset = function (kind, offset) {
        var query = this.gcpDatastore.createQuery(this.kindPrefix.concat(kind)).offset(offset).limit(1);
        console.log((0, infra_1.gcpQueryOffsetStart)(query));
        return this.gcpDatastore.runQuery(query)
            .then(function (queryResponse) {
            var entities = queryResponse[0];
            console.log((0, infra_1.entityRetreivedAtOffset)(entities, query));
            return entities.length === 1
                ? entities[0]
                : entities.length === 0
                    ? new Error((0, infra_1.retreiveRecordByOffsetErrorNoEntity)(kind, offset))
                    : new Error((0, infra_1.retreiveRecordByOffsetErrorMultipleEntities)(kind, offset));
        })["catch"](function (error) { return Promise.reject(error); });
    };
    GcpDatastore.prototype.retreiveRecordQuantity = function (kind) {
        var query = this.gcpDatastore.createQuery(this.kindPrefix.concat(kind)).select('__key__');
        return this.gcpDatastore.runQuery(query)
            .then(function (queryResponse) { return Promise.resolve(queryResponse[0].length); })["catch"](function (error) { return Promise.reject(error); });
    };
    GcpDatastore.prototype.queryRecordsOnGoogleDatastore = function (kind, filters) {
        kind = this.kindPrefix.concat(kind);
        console.log((0, infra_1.queryRecordsStart)(kind), filters.map(function (filter) { return (0, infra_1.queryRecordsFilter)(filter); }).join(','));
        var query = this.gcpDatastore.createQuery(kind);
        filters.forEach(function (filter) {
            query.filter(filter.property, filter.operator, filter.value);
        });
        return query.run()
            .then(function (queryResponse) {
            var entities = queryResponse[0];
            filters.forEach(function (filter) { if (filter.value === 'ERROR')
                throw new Error((0, infra_1.queryRecordsError)(filter)); });
            console.log((0, infra_1.queryRecordsSuccess)(entities, kind));
            return entities;
        })["catch"](function (error) { return error; });
    };
    GcpDatastore.prototype.retreiveRecordOnGoogleDatastore = function (gcpEntitypath) {
        var path = this.kindPrefix.concat(gcpEntitypath.join(this.keyPathSeparator));
        console.log((0, infra_1.retreiveRecordStart)(path));
        return this.gcpDatastore.get(this.gcpDatastore.key({ path: path.split(this.keyPathSeparator) }))
            .then(function (result) {
            var entity = result[0];
            console.log((0, infra_1.retreiveRecordSuccess)(path, entity));
            return Promise.resolve(entity);
        })["catch"](function (error) {
            console.log((0, infra_1.retreiveRecordError)(error));
            return Promise.resolve(error);
        });
    };
    GcpDatastore.prototype.deleteRecordOnGoogleDatastore = function (gcpEntitypath) {
        var path = this.kindPrefix.concat(gcpEntitypath.join(this.keyPathSeparator));
        console.log((0, infra_1.deleteRecordStart)(path));
        return this.gcpDatastore["delete"](this.gcpDatastore.key({ path: path.split(this.keyPathSeparator) }))
            .then(function (result) {
            console.log((0, infra_1.deleteRecordSuccess)(path));
            return Promise.resolve();
        })["catch"](function (error) {
            console.log((0, infra_1.deleteRecordError)(error));
            return Promise.resolve(error);
        });
    };
    GcpDatastore.prototype.saveRecordOnGoogleDatastore = function (gcpEntitypath, entity) {
        var path = this.kindPrefix.concat(gcpEntitypath.join(this.keyPathSeparator));
        console.log((0, infra_1.saveRecordStart)(path));
        return this.gcpDatastore.save({ key: this.gcpDatastore.key({ path: path.split(this.keyPathSeparator) }), data: entity })
            .then(function (response) {
            console.log((0, infra_1.saveRecordSuccess)(path));
            return Promise.resolve();
        })["catch"](function (error) {
            console.log((0, infra_1.saveRecordError)(error));
            return Promise.resolve(error);
        });
    };
    return GcpDatastore;
}());
exports.GcpDatastore = GcpDatastore;
