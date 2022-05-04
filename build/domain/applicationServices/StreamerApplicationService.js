"use strict";
exports.__esModule = true;
exports.StreamersApplicationService = void 0;
var StreamersApplicationService = /** @class */ (function () {
    function StreamersApplicationService(streamersGateway) {
        this.streamersGateway = streamersGateway;
    }
    StreamersApplicationService.prototype.isStreamerRegistered = function (username) {
        return this.streamersGateway.hasStreamerRegistered(username);
    };
    StreamersApplicationService.prototype.retrieveAllStreamers = function () {
        return this.streamersGateway.retrieveAllStreamers();
    };
    StreamersApplicationService.prototype.registerStreamer = function (username) {
        var _this = this;
        return this.streamersGateway.hasStreamerRegistered(username)
            .then(function (hasStreamerRegistered) { return hasStreamerRegistered
            ? Promise.resolve()
            : _this.streamersGateway.registerStreamer({ username: username }); })["catch"](function (error) { return Promise.reject(error); });
    };
    return StreamersApplicationService;
}());
exports.StreamersApplicationService = StreamersApplicationService;
