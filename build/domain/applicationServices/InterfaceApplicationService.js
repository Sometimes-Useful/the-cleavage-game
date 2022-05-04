"use strict";
exports.__esModule = true;
exports.InterfaceApplicationService = void 0;
var notifications_1 = require("../entities/notification/notifications");
var sound_1 = require("../entities/sound");
var SoundType_1 = require("../entities/SoundType");
var InterfaceApplicationService = /** @class */ (function () {
    function InterfaceApplicationService(interfaceGateway) {
        this.interfaceGateway = interfaceGateway;
    }
    InterfaceApplicationService.prototype.updateStreamerRegistered = function (isStreamerRegistered) {
        return this.interfaceGateway.updateStreamerRegistered(isStreamerRegistered);
    };
    InterfaceApplicationService.prototype.updateRegisteredStreamers = function (streamers) {
        return this.interfaceGateway.updateListOfRegisteredStreamers(streamers);
    };
    InterfaceApplicationService.prototype.updateCleavageDrawpileQuantity = function (cleavageDrawpileQuantity) {
        return this.interfaceGateway.updateCleavageDrawpileQuantity(cleavageDrawpileQuantity);
    };
    InterfaceApplicationService.prototype.changeVideoExtractVolumeLevel = function (volume) {
        return Promise.all([
            this.playSound(new sound_1.Sound(SoundType_1.SupportedSound.TICK)),
            this.interfaceGateway.changeVideoExtractVolumeLevel(volume)
        ])
            .then(function () { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    InterfaceApplicationService.prototype.changeGamePhase = function (gamePhase) {
        return this.interfaceGateway.changeGamePhase(gamePhase);
    };
    InterfaceApplicationService.prototype.removeEntityInterfaceState = function (id) {
        return this.interfaceGateway.removeEntityInterfaceState(id);
    };
    InterfaceApplicationService.prototype.updateEntityInterfaceState = function (id, interfaceEntityState) {
        return this.interfaceGateway.updateEntityInterfaceState(id, interfaceEntityState);
    };
    InterfaceApplicationService.prototype.disableAutoplay = function () {
        return this.interfaceGateway.disableAutoplay();
    };
    InterfaceApplicationService.prototype.enableAutoplay = function () {
        return this.interfaceGateway.enableAutoplay();
    };
    InterfaceApplicationService.prototype.changeMusicVolumeLevel = function (volume) {
        return this.interfaceGateway.changeMusicVolumeLevel(volume);
    };
    InterfaceApplicationService.prototype.changeSoundVolumeLevel = function (volume) {
        return this.interfaceGateway.changeSoundVolumeLevel(volume);
    };
    InterfaceApplicationService.prototype.playMusic = function (music) {
        return this.interfaceGateway.playMusic(music);
    };
    InterfaceApplicationService.prototype.onNoCleavageAvailable = function () {
        return Promise.all([
            this.clearCleavage(),
            this.notify(notifications_1.noCleavageAvailableNotification)
        ])
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    InterfaceApplicationService.prototype.playSound = function (sound) {
        return this.interfaceGateway.playSound(sound);
    };
    InterfaceApplicationService.prototype.retrieveCurrentView = function () {
        return this.interfaceGateway.retrieveCurrentView();
    };
    InterfaceApplicationService.prototype.notify = function (notification) {
        return this.interfaceGateway.notify(notification);
    };
    InterfaceApplicationService.prototype.updateCleavage = function (cleavage) {
        return this.interfaceGateway.updateCleavage(cleavage);
    };
    InterfaceApplicationService.prototype.changeView = function (interfaceView) {
        return this.interfaceGateway.changeView(interfaceView);
    };
    InterfaceApplicationService.prototype.newCleavage = function () {
        return this.clearCleavage();
    };
    InterfaceApplicationService.prototype.clearCleavage = function () {
        return this.interfaceGateway.updateCleavage(undefined);
    };
    return InterfaceApplicationService;
}());
exports.InterfaceApplicationService = InterfaceApplicationService;
