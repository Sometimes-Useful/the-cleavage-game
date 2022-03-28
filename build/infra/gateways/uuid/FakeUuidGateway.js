"use strict";
exports.__esModule = true;
exports.FakeUuidGateway = void 0;
var FakeUuidGateway = /** @class */ (function () {
    function FakeUuidGateway() {
        this.uuids = [];
    }
    FakeUuidGateway.prototype.nextId = function () {
        var uuid = this.uuids.shift();
        return uuid
            ? Promise.resolve(uuid)
            : Promise.reject(new Error("No UUID available on ".concat(this.constructor.name, ".")));
    };
    return FakeUuidGateway;
}());
exports.FakeUuidGateway = FakeUuidGateway;
