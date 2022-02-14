"use strict";
exports.__esModule = true;
exports.expressCommandApi = void 0;
var express_1 = require("express");
var Cleavage_1 = require("../domain/entities/Cleavage");
var SaveCleavageOnGlobalCleavageDrawPileEvent_1 = require("../domain/events/saveCleavageOnGlobalCleavageDrawPile/SaveCleavageOnGlobalCleavageDrawPileEvent");
var Backend_API_URL_1 = require("./Backend_API_URL");
function expressCommandApi(app, application) {
    app.use((0, express_1.json)());
    app.post(Backend_API_URL_1.BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_SAVE, function (req, res, next) {
        return cleavageFromBody(req.body)
            .then(function (cleavage) { return application.gateways.event.sendEvent(new SaveCleavageOnGlobalCleavageDrawPileEvent_1.SaveCleavageOnGlobalCleavageDrawPileEvent(cleavage)); })
            .then(function (result) { return res.send(); })["catch"](function (error) { return next(error); });
    });
}
exports.expressCommandApi = expressCommandApi;
var cleavageFromBody = function (body) {
    var cleavageDTO = body;
    var cleavage = new Cleavage_1.Cleavage(cleavageDTO.title, cleavageDTO.leftChoice, cleavageDTO.rightChoice, cleavageDTO.players);
    return Promise.resolve(cleavage);
};
