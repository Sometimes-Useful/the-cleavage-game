"use strict";
exports.__esModule = true;
exports.expressQueryApi = void 0;
var Cleavage_1 = require("../../domain/entities/Cleavage");
var Backend_API_URL_1 = require("../../api/Backend_API_URL");
function expressQueryApi(app, application) {
    app.get(Backend_API_URL_1.BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_DRAW, function (req, res, next) {
        return application.queryController.drawGlobalCleavageDrawPile()
            .then(function (result) { return res.send(result instanceof Cleavage_1.Cleavage ? result.toDto() : result); })["catch"](function (error) {
            console.log(error);
            return next(error);
        });
    });
    app.get(Backend_API_URL_1.BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_QUANTITY, function (req, res, next) {
        return application.queryController.retrieveCleavageDrawpileQuantity()
            .then(function (result) { return res.send(result.toString()); })["catch"](function (error) {
            console.log(error);
            return next(error);
        });
    });
    app.get("".concat(Backend_API_URL_1.BACKEND_API_URL.STREAMERS), function (req, res, next) {
        return application.queryController.retrieveAllRegisteredStreamers()
            .then(function (result) { return res.send(result); })["catch"](function (error) {
            console.log(error);
            return next(error);
        });
    });
    app.get("".concat(Backend_API_URL_1.BACKEND_API_URL.STREAMERS, "/:username"), function (req, res, next) {
        return application.queryController.retrieveRegisteredStreamerByUsername(req.params.username)
            .then(function (result) { return res.send(result); })["catch"](function (error) {
            console.log(error);
            return next(error);
        });
    });
}
exports.expressQueryApi = expressQueryApi;
