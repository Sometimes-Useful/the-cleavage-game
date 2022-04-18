"use strict";
exports.__esModule = true;
exports.FakeDateGateway = void 0;
var FakeDateGateway = /** @class */ (function () {
    function FakeDateGateway() {
        this.currentDate = new Date();
    }
    FakeDateGateway.prototype.retrieveCurrentDate = function () {
        return Promise.resolve(this.currentDate);
    };
    return FakeDateGateway;
}());
exports.FakeDateGateway = FakeDateGateway;
