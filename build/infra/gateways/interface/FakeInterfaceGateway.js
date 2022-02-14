"use strict";
exports.__esModule = true;
exports.FakeInterfaceGateway = void 0;
var InterfaceView_1 = require("../../../domain/entities/InterfaceView");
var FakeInterfaceGateway = /** @class */ (function () {
    function FakeInterfaceGateway() {
        this.notifications = [];
        this.playingSounds = [];
        this.musicVolume = 0;
        this.soundVolume = 0;
        this.autoplayEnabled = false;
        this.playingMusic = undefined;
        this.currentView = InterfaceView_1.InterfaceView.NONE;
    }
    FakeInterfaceGateway.prototype.disableAutoplay = function () {
        this.autoplayEnabled = false;
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.enableAutoplay = function () {
        this.autoplayEnabled = true;
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.changeMusicVolumeLevel = function (volume) {
        this.musicVolume = volume;
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.changeSoundVolumeLevel = function (volume) {
        this.soundVolume = volume;
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.playMusic = function (music) {
        this.playingMusic = music;
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.playSound = function (sound) {
        this.playingSounds.push(sound);
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.retrieveCurrentView = function () {
        return Promise.resolve(this.currentView);
    };
    FakeInterfaceGateway.prototype.notify = function (notification) {
        this.notifications.push(notification);
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.updateCleavage = function (cleavage) {
        this.currentCleavage = cleavage;
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.changeView = function (interfaceView) {
        this.currentView = interfaceView;
        return Promise.resolve();
    };
    return FakeInterfaceGateway;
}());
exports.FakeInterfaceGateway = FakeInterfaceGateway;
