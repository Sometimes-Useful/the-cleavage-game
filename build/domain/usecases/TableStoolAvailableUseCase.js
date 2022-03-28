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
exports.TableStoolAvailableUseCase = void 0;
var unitTests_1 = require("../tests/unitTests/unitTests");
var UseCase_1 = require("./UseCase");
var TableStoolAvailableUseCase = /** @class */ (function (_super) {
    __extends(TableStoolAvailableUseCase, _super);
    function TableStoolAvailableUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    TableStoolAvailableUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.bar.nextOccupiedBarStool()
            .then(function (occupiedBarStool) { return occupiedBarStool ? _this.onOccupiedBarStool(occupiedBarStool) : undefined; })["catch"](function (error) { return Promise.reject(error); });
    };
    TableStoolAvailableUseCase.prototype.onOccupiedBarStool = function (occupiedStool) {
        var _this = this;
        console.log((0, unitTests_1.stringifyWithDetailledSetAndMap)(occupiedStool));
        return this.applicationServices.bar.hasAvailableTableStool()
            .then(function (isTableStoolAvailable) { return isTableStoolAvailable ? _this.applicationServices.bar.onOccupiedBarStool(occupiedStool) : _this.applicationServices.bar.askForNewTable(); })["catch"](function (error) { return Promise.reject(error); });
    };
    return TableStoolAvailableUseCase;
}(UseCase_1.UseCase));
exports.TableStoolAvailableUseCase = TableStoolAvailableUseCase;
