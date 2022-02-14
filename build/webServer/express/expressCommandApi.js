"use strict";
exports.__esModule = true;
exports.expressCommandApi = void 0;
var express_1 = require("express");
var Cleavage_1 = require("../../domain/entities/Cleavage");
var SaveCleavageOnGlobalCleavageDrawPileEvent_1 = require("../../domain/events/saveCleavageOnGlobalCleavageDrawPile/SaveCleavageOnGlobalCleavageDrawPileEvent");
var Backend_API_URL_1 = require("../../api/Backend_API_URL");
function expressCommandApi(app, application) {
    app.use((0, express_1.json)());
    app.post(Backend_API_URL_1.BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_SAVE, function (req, res, next) {
        return application.gateways.event.sendEvent(new SaveCleavageOnGlobalCleavageDrawPileEvent_1.SaveCleavageOnGlobalCleavageDrawPileEvent(cleavageDTOFromBody(req.body)))
            .then(function (result) { return res.send(); })["catch"](function (error) { return next(error); });
    });
}
exports.expressCommandApi = expressCommandApi;
var cleavageDTOFromBody = function (body) {
    var cleavageDTO = body;
    return new Cleavage_1.Cleavage(cleavageDTO);
};
