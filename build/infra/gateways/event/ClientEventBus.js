"use strict";
exports.__esModule = true;
exports.ClientEventBus = void 0;
var ClientEventBus = /** @class */ (function () {
    function ClientEventBus() {
    }
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
