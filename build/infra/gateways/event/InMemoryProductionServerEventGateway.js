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
exports.InMemoryProductionServerEventGateway = void 0;
var ServerEventBus_1 = require("./ServerEventBus");
var InMemoryProductionServerEventGateway = /** @class */ (function (_super) {
    __extends(InMemoryProductionServerEventGateway, _super);
    function InMemoryProductionServerEventGateway() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InMemoryProductionServerEventGateway.prototype.sendEvent = function (event) {
        console.log('SERVER NEW EVENT', event);
        return this.onEvent(event);
    };
    return InMemoryProductionServerEventGateway;
}(ServerEventBus_1.ServerEventBus));
exports.InMemoryProductionServerEventGateway = InMemoryProductionServerEventGateway;
