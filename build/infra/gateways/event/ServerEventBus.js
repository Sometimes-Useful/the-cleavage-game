"use strict";
exports.__esModule = true;
exports.ServerEventBus = void 0;
var ServerEventBus = /** @class */ (function () {
    function ServerEventBus() {
    }
    ServerEventBus.prototype.onEvents = function (events) {
        var _this = this;
        return Promise.all(events.map(function (event) { return _this.onEvent(event); }))
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    ServerEventBus.prototype.onEvent = function (event) {
        return this.controller
            ? this.controller.executeEvent(event)
            : Promise.reject(new Error('Controller not configured.'));
    };
    ServerEventBus.prototype.configureController = function (commandController) {
        this.controller = commandController;
    };
    return ServerEventBus;
}());
exports.ServerEventBus = ServerEventBus;
