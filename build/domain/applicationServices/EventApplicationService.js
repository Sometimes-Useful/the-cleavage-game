"use strict";
exports.__esModule = true;
exports.EventApplicationService = void 0;
var EventApplicationService = /** @class */ (function () {
    function EventApplicationService(eventGateway) {
        this.eventGateway = eventGateway;
    }
    EventApplicationService.prototype.sentEvent = function (event) {
        return this.eventGateway.sendEvent(event);
    };
    EventApplicationService.prototype.sentEvents = function (events) {
        var _this = this;
        return Promise.all(events.map(function (event) { return _this.sentEvent(event); }))
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    return EventApplicationService;
}());
exports.EventApplicationService = EventApplicationService;
