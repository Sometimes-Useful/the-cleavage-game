"use strict";
exports.__esModule = true;
exports.ClientEventBus = void 0;
var ClientEventBus = /** @class */ (function () {
    function ClientEventBus() {
    }
    ClientEventBus.prototype.onEvents = function (events) {
        var _this = this;
        return Promise.all(events.map(function (event) { return _this.onEvent(event); }))
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    ClientEventBus.prototype.onEvent = function (event) {
        return this.controller
            ? this.controller.executeEvent(event)
            : Promise.reject(new Error('Controller not configured.'));
    };
    ClientEventBus.prototype.configureController = function (controller) {
        this.controller = controller;
    };
    return ClientEventBus;
}());
exports.ClientEventBus = ClientEventBus;
