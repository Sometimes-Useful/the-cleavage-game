"use strict";
exports.__esModule = true;
exports.FakeStreamersGateway = void 0;
var FakeStreamersGateway = /** @class */ (function () {
    function FakeStreamersGateway() {
        this.registeredStreamers = [];
    }
    FakeStreamersGateway.prototype.retrieveAllStreamers = function () {
        return Promise.resolve(this.registeredStreamers);
    };
    FakeStreamersGateway.prototype.hasStreamerRegistered = function (username) {
        return Promise.resolve(this.registeredStreamers.some(function (registeredStreamer) { return registeredStreamer.username === username; }));
    };
    FakeStreamersGateway.prototype.registerStreamer = function (username) {
        this.registeredStreamers.push(username);
        return Promise.resolve();
    };
    return FakeStreamersGateway;
}());
exports.FakeStreamersGateway = FakeStreamersGateway;
