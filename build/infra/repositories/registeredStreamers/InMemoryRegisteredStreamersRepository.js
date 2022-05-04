"use strict";
exports.__esModule = true;
exports.InMemoryGlobalRegisteredStreamersRepository = void 0;
var InMemoryGlobalRegisteredStreamersRepository = /** @class */ (function () {
    function InMemoryGlobalRegisteredStreamersRepository() {
        this.registeredStreamers = [];
    }
    InMemoryGlobalRegisteredStreamersRepository.prototype.retrieveAll = function () {
        return Promise.resolve(this.registeredStreamers);
    };
    InMemoryGlobalRegisteredStreamersRepository.prototype.retrieveByUsername = function (username) {
        var registeredStreamer = this.registeredStreamers.find(function (registeredStreamer) { return registeredStreamer.username === username; });
        return registeredStreamer
            ? Promise.resolve(registeredStreamer)
            : Promise.reject(new Error("Streamer with username '".concat(username, "' is not registered on registered streamer repository.")));
    };
    InMemoryGlobalRegisteredStreamersRepository.prototype.isExistByUsername = function (username) {
        return Promise.resolve(this.registeredStreamers.some(function (registeredStreamer) { return registeredStreamer.username === username; }));
    };
    InMemoryGlobalRegisteredStreamersRepository.prototype.save = function (streamer) {
        this.registeredStreamers.push(streamer);
        return Promise.resolve();
    };
    return InMemoryGlobalRegisteredStreamersRepository;
}());
exports.InMemoryGlobalRegisteredStreamersRepository = InMemoryGlobalRegisteredStreamersRepository;
