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
exports.InstallNewTableUseCase = void 0;
var UseCase_1 = require("./UseCase");
var InstallNewTableUseCase = /** @class */ (function (_super) {
    __extends(InstallNewTableUseCase, _super);
    function InstallNewTableUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    InstallNewTableUseCase.prototype.execute = function (event) {
        return this.applicationServices.bar.installNewTable();
    };
    return InstallNewTableUseCase;
}(UseCase_1.UseCase));
exports.InstallNewTableUseCase = InstallNewTableUseCase;
