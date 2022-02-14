"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.SvelteAndToneInterfaceGateway = void 0;
var InterfaceView_1 = require("../../../domain/entities/InterfaceView");
var defaultVolumeLevels_1 = require("./defaultVolumeLevels");
var stores_1 = require("../../../ui/stores/stores");
var Tone = __importStar(require("tone"));
var SvelteAndToneInterfaceGateway = /** @class */ (function () {
    function SvelteAndToneInterfaceGateway(supportedSounds, supportedMusics) {
        this.supportedSounds = supportedSounds;
        this.supportedMusics = supportedMusics;
        this.musicVolumeFader = new Tone.Volume(Tone.gainToDb(defaultVolumeLevels_1.defaultMusicVolumeLevel / 100)).toDestination();
        this.soundVolumeFader = new Tone.Volume(Tone.gainToDb(defaultVolumeLevels_1.defaultSoundVolumeLevel / 100)).toDestination();
        this.currentView = InterfaceView_1.InterfaceView.NONE;
        this.toneReady = false;
    }
    SvelteAndToneInterfaceGateway.prototype.disableAutoplay = function () {
        stores_1.autoplayStore.set(false);
        return Promise.resolve();
    };
    SvelteAndToneInterfaceGateway.prototype.enableAutoplay = function () {
        stores_1.autoplayStore.set(true);
        return Promise.resolve();
    };
    SvelteAndToneInterfaceGateway.prototype.changeMusicVolumeLevel = function (volume) {
        this.musicVolumeFader.volume.value = Tone.gainToDb(volume / 100);
        stores_1.musicVolumeStore.set(volume);
        return Promise.resolve();
    };
    SvelteAndToneInterfaceGateway.prototype.changeSoundVolumeLevel = function (volume) {
        this.soundVolumeFader.volume.value = Tone.gainToDb(volume / 100);
        stores_1.soundVolumeStore.set(volume);
        return Promise.resolve();
    };
    SvelteAndToneInterfaceGateway.prototype.load = function () {
        var _this = this;
        console.log('Tone loading...');
        return Tone.loaded()
            .then(function () {
            console.log('Tone loaded.');
            _this.toneReady = true;
            console.log('Tone starting...');
            return Tone.start();
        })
            .then(function () {
            console.log('Tone started.');
            return Promise.resolve();
        })["catch"](function (error) { return Promise.reject(error); });
    };
    SvelteAndToneInterfaceGateway.prototype.playMusic = function (music) {
        console.log('PLAY_MUSIC', music.supportedMusic);
        var musicBufferToPlay = this.supportedMusics.get(music.supportedMusic);
        return !this.toneReady
            ? Promise.reject(new Error(toneIsNotReady))
            : !musicBufferToPlay
                ? Promise.reject(new Error(missingMusicOnMusicAssets(music)))
                : musicBufferToPlay.loaded
                    ? this.onMusicReadyToPlay(music, musicBufferToPlay)
                    : Promise.reject(new Error(musicBufferIsNotLoaded(music)));
    };
    SvelteAndToneInterfaceGateway.prototype.playSound = function (sound) {
        console.log('PLAY_SOUND', sound.type);
        var soundBufferToPlay = this.supportedSounds.get(sound.type);
        return !this.toneReady
            ? Promise.reject(new Error(toneIsNotReady))
            : !soundBufferToPlay
                ? Promise.reject(new Error(missingSoundOnSoundAssets(sound)))
                : soundBufferToPlay.loaded
                    ? this.onSoundReadyToPlay(sound.type, soundBufferToPlay)
                    : Promise.reject(new Error(soundBufferIsNotLoaded(sound)));
    };
    SvelteAndToneInterfaceGateway.prototype.retrieveCurrentView = function () {
        return Promise.resolve(this.currentView);
    };
    SvelteAndToneInterfaceGateway.prototype.notify = function (notification) {
        console.log('NOTIFY', notification.message);
        return Promise.resolve();
    };
    SvelteAndToneInterfaceGateway.prototype.updateCleavage = function (cleavage) {
        console.log('UPDATE_CLEAVAGE', cleavage);
        stores_1.currentCleavageStore.set(cleavage);
        return Promise.resolve();
    };
    SvelteAndToneInterfaceGateway.prototype.changeView = function (interfaceView) {
        console.log('CHANGE_VIEW', interfaceView);
        this.currentView = interfaceView;
        stores_1.interfaceViewStore.set(interfaceView);
        return Promise.resolve();
    };
    SvelteAndToneInterfaceGateway.prototype.onMusicReadyToPlay = function (music, musicToPlay) {
        console.log('PLAYING_MUSIC', music.supportedMusic);
        var player = new Tone.Player(musicToPlay).connect(this.musicVolumeFader);
        player.loop = true;
        player.start();
        return Promise.resolve();
    };
    SvelteAndToneInterfaceGateway.prototype.onSoundReadyToPlay = function (supportedSound, soundToPlay) {
        console.log('PLAYING_SOUND', supportedSound);
        var player = new Tone.Player(soundToPlay).connect(this.soundVolumeFader);
        player.start();
        return Promise.resolve();
    };
    return SvelteAndToneInterfaceGateway;
}());
exports.SvelteAndToneInterfaceGateway = SvelteAndToneInterfaceGateway;
var toneIsNotReady = 'Tone is not ready';
var soundBufferIsNotLoaded = function (sound) { return "Tone sound buffer ".concat(sound.type, " is not loaded."); };
var musicBufferIsNotLoaded = function (music) { return "Tone music buffer ".concat(music.supportedMusic, " is not loaded."); };
var missingSoundOnSoundAssets = function (sound) { return "Missing sound ".concat(sound.type, " on sound assets."); };
var missingMusicOnMusicAssets = function (music) { return "Missing music ".concat(music.supportedMusic, " on sound assets."); };
