"use strict";
exports.__esModule = true;
exports.GcpDatastore = void 0;
var datastore_1 = require("@google-cloud/datastore");
var GcpDatastore = /** @class */ (function () {
    function GcpDatastore(gcpDatastoreInteractorConfiguration) {
        this.keyPathSeparator = '/';
        if (gcpDatastoreInteractorConfiguration.gcpClientEmail === undefined ||
            gcpDatastoreInteractorConfiguration.gcpPrivateKey === undefined ||
            gcpDatastoreInteractorConfiguration.gcpProjectId === undefined ||
            gcpDatastoreInteractorConfiguration.gcpKindPrefix === undefined)
            throw new Error("gcpDatastoreInteractorConfiguration bad configuration : ".concat(JSON.stringify(gcpDatastoreInteractorConfiguration)));
        this.kindPrefix = gcpDatastoreInteractorConfiguration.gcpKindPrefix;
        this.gcpDatastore = new datastore_1.Datastore({
            projectId: gcpDatastoreInteractorConfiguration.gcpProjectId,
            credentials: {
                client_email: gcpDatastoreInteractorConfiguration.gcpClientEmail,
                private_key: gcpDatastoreInteractorConfiguration.gcpPrivateKey
            }
        });
    }
    GcpDatastore.prototype.retreiveRecordByOffset = function (kind, offset) {
        var query = this.gcpDatastore.createQuery(this.kindPrefix.concat(kind));
        query.offsetVal = offset;
        query.limitVal = 1;
        return this.gcpDatastore.runQuery(query)
            .then(function (queryResponse) {
            var entities = queryResponse[0];
            console.log("\u2714\uFE0F  ".concat(entities.length, " entities retrieved on kind '").concat(kind, "' at offset '").concat(offset, "'."));
            if (entities.length === 1)
                return entities[0];
            if (entities.length === 0)
                return new Error("No entity of kind '".concat(kind, "' at offset '").concat(offset, "'"));
            return new Error("Multiple entities of kind '".concat(kind, "' at offset '").concat(offset, "' ?!"));
        })["catch"](function (error) { return Promise.reject(error); });
    };
    GcpDatastore.prototype.retreiveRecordQuantity = function (kind) {
        var query = this.gcpDatastore.createQuery(this.kindPrefix.concat(kind));
        query.select('__key__');
        return this.gcpDatastore.runQuery(query)
            .then(function (queryResponse) { return Promise.resolve(queryResponse[0].length); })["catch"](function (error) { return Promise.reject(error); });
    };
    GcpDatastore.prototype.queryRecordsOnGoogleDatastore = function (kind, filters) {
        kind = this.kindPrefix.concat(kind);
        console.log("\u2699\uFE0F  queryRecordsOnGoogleDatastore - ".concat(kind, " "));
        var query = this.gcpDatastore.createQuery(kind);
        filters.forEach(function (filter) {
            console.log("\u2699\uFE0F  ".concat(filter.property).concat(filter.operator).concat(filter.value));
            query.filter(filter.property, filter.operator, filter.value);
        });
        return query.run()
            .then(function (queryResponse) {
            var entities = queryResponse[0];
            filters.forEach(function (filter) { if (filter.value === 'ERROR')
                throw new Error("Filter ".concat(filter.value, " Error")); });
            console.log("\u2714\uFE0F  ".concat(entities.length, " entities retrieved on kind ").concat(kind, " according to filters."));
            return entities;
        })["catch"](function (error) { return error; });
    };
    GcpDatastore.prototype.retreiveRecordOnGoogleDatastore = function (path) {
        var _this = this;
        return new Promise(function (resolve) {
            var keyPathString = _this.kindPrefix.concat(path.join(_this.keyPathSeparator));
            console.log("\u2699\uFE0F  retreiveRecordOnGoogleDatastore - ".concat(keyPathString));
            var pathTypes = keyPathString.split(_this.keyPathSeparator);
            var keyOption = { path: pathTypes };
            var key = _this.gcpDatastore.key(keyOption);
            _this.gcpDatastore.get(key, function (error, entity) {
                if (error) {
                    console.log("\u274C ".concat(error.message));
                    resolve(error);
                }
                else {
                    console.log("\u2714\uFE0F  Entity with key path ".concat(keyPathString, " retreived from datastore."));
                    return resolve(entity);
                }
            });
        });
    };
    GcpDatastore.prototype.deleteRecordOnGoogleDatastore = function (path) {
        var _this = this;
        return new Promise(function (resolve) {
            var keyPathString = _this.kindPrefix.concat(path.join(_this.keyPathSeparator));
            console.log("\u2699\uFE0F  deleteRecordOnGoogleDatastore - ".concat(keyPathString));
            var keyOption = { path: keyPathString.split(_this.keyPathSeparator) };
            var key = _this.gcpDatastore.key(keyOption);
            _this.gcpDatastore["delete"](key, function (error) {
                if (error) {
                    console.log("\u274C  ".concat(error.message));
                    resolve(error);
                }
                else {
                    console.log("\u2714\uFE0F  Entity with key path ".concat(keyPathString, " deleted on datastore."));
                    resolve();
                }
            });
        });
    };
    GcpDatastore.prototype.saveRecordOnGoogleDatastore = function (path, entity) {
        var _this = this;
        return new Promise(function (resolve) {
            var keyPathString = _this.kindPrefix.concat(path.join(_this.keyPathSeparator));
            console.log("\u2699\uFE0F  saveRecordOnGoogleDatastore - ".concat(keyPathString));
            var keyOption = { path: keyPathString.split(_this.keyPathSeparator) };
            var key = _this.gcpDatastore.key(keyOption);
            var callback = function (error) {
                if (error) {
                    console.log("\u274C  ".concat(error.message));
                    resolve(error);
                }
                else {
                    console.log("\u2714\uFE0F  Entity with key path ".concat(keyPathString, " saved on datastore."));
                    resolve();
                }
            };
            _this.gcpDatastore.save({ key: key, data: entity }, function () { return callback(); });
        });
    };
    return GcpDatastore;
}());
exports.GcpDatastore = GcpDatastore;
// const noEntityWithPathErrorMessage = (keyPath:string):string => `No entity with path ${keyPath}`
