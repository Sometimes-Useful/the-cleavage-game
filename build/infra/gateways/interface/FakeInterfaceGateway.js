"use strict";
exports.__esModule = true;
exports.FakeInterfaceGateway = void 0;
var InterfaceView_1 = require("../../../domain/entities/InterfaceView");
var GamePhase_1 = require("../../../domain/entities/GamePhase");
var FakeInterfaceGateway = /** @class */ (function () {
    function FakeInterfaceGateway() {
        this.musicMuted = false;
        this.gamePhase = GamePhase_1.GamePhase.NONE;
        this.notifications = [];
        this.playingSounds = [];
        this.musicVolume = 0;
        this.soundVolume = 0;
        this.videoExtractVolume = 0;
        this.autoplayEnabled = false;
        this.playingMusic = undefined;
        this.currentView = InterfaceView_1.InterfaceView.NONE;
        this.interfaceEntitiesState = new Map();
        this.cleavageDrawpileQuantity = 0;
        this.registeredStreamers = [];
        this.isStreamerRegistered = false;
    }
    FakeInterfaceGateway.prototype.updateStreamerRegistered = function (isRegistered) {
        this.isStreamerRegistered = isRegistered;
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.updateListOfRegisteredStreamers = function (streamers) {
        this.registeredStreamers = streamers;
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.updateCleavageDrawpileQuantity = function (cleavageDrawpileQuantity) {
        this.cleavageDrawpileQuantity = cleavageDrawpileQuantity;
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.changeVideoExtractVolumeLevel = function (volume) {
        this.videoExtractVolume = volume;
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.unMuteMusic = function () {
        this.musicMuted = false;
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.muteMusic = function () {
        this.musicMuted = true;
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.changeVideoExtract = function (videoExtract) {
        this.videoExtract = videoExtract;
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.changeGamePhase = function (gamePhase) {
        this.gamePhase = gamePhase;
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.removeEntityInterfaceState = function (id) {
        this.interfaceEntitiesState["delete"](id);
        return Promise.resolve();
    };
    FakeInterfaceGateway.prototype.updateEntityInterfaceState = function (id, interfaceEntityState) {
        this.interfaceEntitiesState.set(id, interfaceEntityState);
        return Promise.resolve();
    };
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
