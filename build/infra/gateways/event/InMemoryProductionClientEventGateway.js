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
exports.InMemoryProductionClientEventGateway = void 0;
var ClientEventBus_1 = require("./ClientEventBus");
var InMemoryProductionClientEventGateway = /** @class */ (function (_super) {
    __extends(InMemoryProductionClientEventGateway, _super);
    function InMemoryProductionClientEventGateway() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InMemoryProductionClientEventGateway.prototype.sendEvents = function (events) {
        var _this = this;
        return Promise.all(events.map(function (event) { return _this.sendEvent(event); }))
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    InMemoryProductionClientEventGateway.prototype.sendEvent = function (event) {
        console.log('NEW EVENT', event);
        return this.onEvent(event);
    };
    return InMemoryProductionClientEventGateway;
}(ClientEventBus_1.ClientEventBus));
exports.InMemoryProductionClientEventGateway = InMemoryProductionClientEventGateway;
