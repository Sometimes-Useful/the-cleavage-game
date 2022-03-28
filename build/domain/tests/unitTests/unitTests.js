"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.isGiven = exports.stringifyWithDetailledSetAndMap = exports.detailedComparisonMessage = void 0;
var Gherkin_1 = require("../Gherkin");
var detailedComparisonMessage = function (currentValue, expectedValue) { return "DETAILS\nexpected >>>>>>>> ".concat((0, exports.stringifyWithDetailledSetAndMap)(currentValue), " \nto deeply equal > ").concat((0, exports.stringifyWithDetailledSetAndMap)(expectedValue), " \n"); };
exports.detailedComparisonMessage = detailedComparisonMessage;
var stringifyWithDetailledSetAndMap = function (value) { return JSON.stringify(value, detailledStringifyForSetAndMap); };
exports.stringifyWithDetailledSetAndMap = stringifyWithDetailledSetAndMap;
var mapToObjectLiteral = function (value) {
    return Array.from(value).reduce(function (obj, _a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        obj[key] = value;
        return obj;
    }, {});
};
var detailledStringifyForSetAndMap = function (key, value) { return (value instanceof Set)
    ? __spreadArray([], __read(value.values()), false) : (value instanceof Map) ? mapToObjectLiteral(value) : value; };
function isGiven(gherkinPrefix) {
    return gherkinPrefix === Gherkin_1.Gherkin.GIVEN || gherkinPrefix === Gherkin_1.Gherkin.AND_GIVEN;
}
exports.isGiven = isGiven;
