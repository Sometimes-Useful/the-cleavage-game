"use strict";
exports.__esModule = true;
exports.GlobalStreamersApplicationService = void 0;
var GlobalStreamersApplicationService = /** @class */ (function () {
    function GlobalStreamersApplicationService(registeredStreamersRepository) {
        this.registeredStreamersRepository = registeredStreamersRepository;
    }
    GlobalStreamersApplicationService.prototype.registeredStreamers = function () {
        return this.registeredStreamersRepository.retrieveAll();
    };
    GlobalStreamersApplicationService.prototype.registeredStreamerByUsername = function (username) {
        var _this = this;
        return this.registeredStreamersRepository.isExistByUsername(username)
            .then(function (isStreamerExistByUsername) { return isStreamerExistByUsername
            ? _this.registeredStreamersRepository.retrieveByUsername(username)
            : Promise.resolve(undefined); });
    };
    GlobalStreamersApplicationService.prototype.registerStreamer = function (streamer) {
        var _this = this;
        return this.registeredStreamersRepository.isExistByUsername(streamer.username)
            .then(function (isStreamerExistByUsername) { return isStreamerExistByUsername
            ? Promise.resolve()
            : _this.registeredStreamersRepository.save(streamer); });
    };
    return GlobalStreamersApplicationService;
}());
exports.GlobalStreamersApplicationService = GlobalStreamersApplicationService;
