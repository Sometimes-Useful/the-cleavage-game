"use strict";
exports.__esModule = true;
exports.eventNotSupported = void 0;
var eventNotSupported = function (event, controller) { return "Event '".concat(event.eventType, "' is not supported by ").concat(controller.constructor.name, "."); };
exports.eventNotSupported = eventNotSupported;
