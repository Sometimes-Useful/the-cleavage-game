"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.FakeClientEventGateway = void 0;
var ClientEventBus_1 = require("./ClientEventBus");
var FakeClientEventGateway = /** @class */ (function (_super) {
    __extends(FakeClientEventGateway, _super);
    function FakeClientEventGateway() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.events = [];
        return _this;
    }
    FakeClientEventGateway.prototype.sendEvents = function (events) {
        /*
        const sendNextEvent = ():Promise<void> => {
            const event = events.shift()
            return event
                ? this.sendEvent(event)
                    .then(() => sendNextEvent())
                    .catch(error => Promise.reject(error))
                : Promise.resolve()
        }
        return sendNextEvent()
        */
        var _this = this;
        return Promise.all(events.map(function (event) { return _this.sendEvent(event); }))
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    FakeClientEventGateway.prototype.sendEvent = function (event) {
        this.events.push(event);
        return Promise.resolve();
    };
    return FakeClientEventGateway;
}(ClientEventBus_1.ClientEventBus));
exports.FakeClientEventGateway = FakeClientEventGateway;
