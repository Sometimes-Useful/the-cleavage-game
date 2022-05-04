"use strict";
exports.__esModule = true;
exports.GcpGlobalRegisteredStreamersRepository = void 0;
var GcpGlobalRegisteredStreamersRepository = /** @class */ (function () {
    function GcpGlobalRegisteredStreamersRepository(gcpDatastore) {
        this.gcpDatastore = gcpDatastore;
        this.kind = 'registeredStreamers';
    }
    GcpGlobalRegisteredStreamersRepository.prototype.retrieveAll = function () {
        return this.gcpDatastore.retreiveAll(this.kind);
    };
    GcpGlobalRegisteredStreamersRepository.prototype["delete"] = function (username) {
        return this.gcpDatastore.deleteRecordOnGoogleDatastore([this.kind, username])
            .then(function (result) { return result instanceof Error ? Promise.reject(result) : Promise.resolve(result); })["catch"](function (error) { return Promise.reject(error); });
    };
    GcpGlobalRegisteredStreamersRepository.prototype.retrieveByUsername = function (username) {
        return this.gcpDatastore.retreiveRecordOnGoogleDatastore([this.kind, username])
            .then(function (result) { return result instanceof Error ? Promise.reject(result) : Promise.resolve(result); })["catch"](function (error) { return Promise.reject(error); });
    };
    GcpGlobalRegisteredStreamersRepository.prototype.isExistByUsername = function (username) {
        var _this = this;
        var filters = [
            { property: 'username', operator: '=', value: username }
        ];
        return this.gcpDatastore.queryRecordsOnGoogleDatastore(this.kind, filters)
            .then(function (result) {
            if (result instanceof Error)
                return Promise.reject(result);
            if (result.length === 1)
                return true;
            if (result.length === 0)
                return false;
            return Promise.reject(new Error("Multiple ".concat(_this.kind, " found with username '").concat(username, "'.")));
        })["catch"](function (error) { return Promise.reject(error); });
    };
    GcpGlobalRegisteredStreamersRepository.prototype.save = function (streamer) {
        return this.gcpDatastore.saveRecordOnGoogleDatastore([this.kind, streamer.username], streamer)
            .then(function (result) { return result instanceof Error ? Promise.reject(result) : Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    return GcpGlobalRegisteredStreamersRepository;
}());
exports.GcpGlobalRegisteredStreamersRepository = GcpGlobalRegisteredStreamersRepository;
