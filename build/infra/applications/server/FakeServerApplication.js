"use strict";
exports.__esModule = true;
exports.FakeServerApplication = void 0;
var FakeServerApplication = /** @class */ (function () {
    function FakeServerApplication(gateways, repositories, queryController) {
        this.gateways = gateways;
        this.repositories = repositories;
        this.queryController = queryController;
    }
    return FakeServerApplication;
}());
exports.FakeServerApplication = FakeServerApplication;
