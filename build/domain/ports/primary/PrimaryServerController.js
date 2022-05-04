"use strict";
exports.__esModule = true;
exports.PrimaryServerCommandController = void 0;
var EventType_1 = require("../../events/EventType");
var messages_1 = require("../../messages/messages");
var RegisterStreamerBackendUseCase_1 = require("../../usecases/RegisterStreamerBackendUseCase");
var SaveGlobalCleavageDrawPileUseCase_1 = require("../../usecases/SaveGlobalCleavageDrawPileUseCase");
var PrimaryServerCommandController = /** @class */ (function () {
    function PrimaryServerCommandController(applicationServices) {
        this.useCases = new Map([]);
        this.useCases.set(EventType_1.EventType.SAVE_CLEAVAGE_ON_GLOBAL_CLEAVAGE_DRAWPILE, new SaveGlobalCleavageDrawPileUseCase_1.SaveGlobalCleavageDrawPileUseCase(applicationServices));
        this.useCases.set(EventType_1.EventType.REGISTER_STREAMER_BACKEND, new RegisterStreamerBackendUseCase_1.RegisterStreamerBackendUseCase(applicationServices));
    }
    PrimaryServerCommandController.prototype.executeEvent = function (event) {
        var usecase = this.useCases.get(event.eventType);
        return usecase
            ? usecase.execute(event)
            : Promise.reject(new Error((0, messages_1.eventNotSupported)(event, this)));
    };
    return PrimaryServerCommandController;
}());
exports.PrimaryServerCommandController = PrimaryServerCommandController;
