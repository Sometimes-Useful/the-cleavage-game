"use strict";
exports.__esModule = true;
exports.GcpGlobalCleavageDrawPileRepository = void 0;
var Cleavage_1 = require("../../../domain/entities/Cleavage");
var GcpGlobalCleavageDrawPileRepository = /** @class */ (function () {
    function GcpGlobalCleavageDrawPileRepository(gcpDatastore) {
        this.gcpDatastore = gcpDatastore;
        this.globalCleavageKind = 'globalCleavage';
    }
    GcpGlobalCleavageDrawPileRepository.prototype.retrieveGlobalCleavageByIndex = function (globalCleavageIndex) {
        return this.gcpDatastore.retreiveRecordByOffset(this.globalCleavageKind, globalCleavageIndex)
            .then(function (result) { return result instanceof Error ? Promise.reject(result) : Promise.resolve(new Cleavage_1.Cleavage(result)); })["catch"](function (error) { return Promise.reject(error); });
    };
    GcpGlobalCleavageDrawPileRepository.prototype.globalCleavageQuantity = function () {
        return this.gcpDatastore.retreiveRecordQuantity(this.globalCleavageKind);
    };
    GcpGlobalCleavageDrawPileRepository.prototype.save = function (cleavage) {
        return this.gcpDatastore.saveRecordOnGoogleDatastore(this.globalCleavageGcpPath(cleavage), cleavage.toDto())
            .then(function (result) { return result instanceof Error ? Promise.reject(result) : Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    GcpGlobalCleavageDrawPileRepository.prototype.hasCleavage = function (cleavage) {
        return this.gcpDatastore.queryRecordsOnGoogleDatastore(this.globalCleavageKind, [{ property: 'title', operator: '=', value: cleavage.title }])
            .then(function (result) { return result instanceof Error ? Promise.resolve(false) : result.length === 1; })["catch"](function (error) { return Promise.reject(error); });
    };
    GcpGlobalCleavageDrawPileRepository.prototype.deleteGlobalCleavage = function (cleavage) {
        return this.gcpDatastore.deleteRecordOnGoogleDatastore(this.globalCleavageGcpPath(cleavage))
            .then(function (result) { return result instanceof Error ? Promise.reject(result) : Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    GcpGlobalCleavageDrawPileRepository.prototype.globalCleavageGcpPath = function (cleavage) {
        return [this.globalCleavageKind, cleavage.title];
    };
    return GcpGlobalCleavageDrawPileRepository;
}());
exports.GcpGlobalCleavageDrawPileRepository = GcpGlobalCleavageDrawPileRepository;
