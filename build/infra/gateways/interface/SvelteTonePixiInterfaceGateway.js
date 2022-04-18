"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.SvelteTonePixiInterfaceGateway = void 0;
var InterfaceView_1 = require("../../../domain/entities/InterfaceView");
var defaultVolumeLevels_1 = require("./defaultVolumeLevels");
var stores_1 = require("../../../ui/stores/stores");
var Tone = __importStar(require("tone"));
var pixi_js_1 = require("pixi.js");
var PixiApplicationCommon_1 = require("./PixiApplicationCommon");
var entityIdMissingOnPixiEntities = function (entityId) { return "Entity id '".concat(entityId, " missing on pixiEntities'"); };
var missingSpriteType = function (spriteType) { return "Missing shape type '".concat(spriteType, "''"); };
var SvelteTonePixiInterfaceGateway = /** @class */ (function (_super) {
    __extends(SvelteTonePixiInterfaceGateway, _super);
    function SvelteTonePixiInterfaceGateway(supportedSounds, supportedMusics, pixiApplication, textureSources) {
        var _this = _super.call(this) || this;
        _this.supportedSounds = supportedSounds;
        _this.supportedMusics = supportedMusics;
        _this.pixiApplication = pixiApplication;
        _this.textureSources = textureSources;
        _this.pixiEntities = new Map();
        _this.musicVolumeFader = new Tone.Volume(Tone.gainToDb(defaultVolumeLevels_1.defaultMusicVolumeLevel / 100)).toDestination();
        _this.soundVolumeFader = new Tone.Volume(Tone.gainToDb(defaultVolumeLevels_1.defaultSoundVolumeLevel / 100)).toDestination();
        _this.currentView = InterfaceView_1.InterfaceView.NONE;
        _this.toneReady = false;
        return _this;
    }
    SvelteTonePixiInterfaceGateway.prototype.addingViewToDom = function (htmlElement) {
        htmlElement.appendChild(this.pixiApplication.view);
        console.log("Adding pixi view to HTML element id ".concat(htmlElement.id));
        return Promise.resolve();
    };
    SvelteTonePixiInterfaceGateway.prototype.changeResolution = function (resolution) {
        this.updateInterfaceStates();
        this.resizePixiAppRenderer(this.conserveAspectRatio(resolution));
        console.log("Resolution changed to ".concat(JSON.stringify(resolution)));
        return Promise.resolve();
    };
    SvelteTonePixiInterfaceGateway.prototype.resizePixiAppRenderer = function (resolution) {
        this.pixiApplication.renderer.resize(resolution.width, resolution.height);
    };
    SvelteTonePixiInterfaceGateway.prototype.updateInterfaceStates = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.pixiEntities), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), pixiEntity = _d[1];
                this.updatePixiEntityGraphically(pixiEntity);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    SvelteTonePixiInterfaceGateway.prototype.updatePixiEntityGraphically = function (pixiEntity) {
        return Promise.all([
            this.updatePixiEntityAbsolutePosition(pixiEntity),
            this.updatePixiEntitySize(pixiEntity)
        ])
            .then(function () { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    SvelteTonePixiInterfaceGateway.prototype.updatePixiEntitySize = function (pixiEntity) {
        var resolution = this.retrieveResolution();
        pixiEntity.pixiSprite.width = resolution.width / this.drawingZone.width;
        pixiEntity.pixiSprite.height = resolution.height / this.drawingZone.height;
    };
    SvelteTonePixiInterfaceGateway.prototype.retrieveResolution = function () {
        return { width: this.pixiApplication.renderer.view.width, height: this.pixiApplication.renderer.view.height };
    };
    SvelteTonePixiInterfaceGateway.prototype.updatePixiEntityAbsolutePosition = function (pixiEntity) {
        var absolutePosition = this.relativePositionToAbsolutePosition(pixiEntity.position, this.offset, this.retrieveResolution());
        pixiEntity.pixiSprite.x = absolutePosition.x;
        pixiEntity.pixiSprite.y = absolutePosition.y;
        return Promise.resolve();
    };
    SvelteTonePixiInterfaceGateway.prototype.conserveAspectRatio = function (resolution) {
        var diffRatio = resolution.width / this.drawingZone.width - resolution.height / this.drawingZone.height;
        if (diffRatio > 0)
            resolution.width = ((resolution.width / this.drawingZone.width) - Math.abs(diffRatio)) * this.drawingZone.width;
        if (diffRatio < 0)
            resolution.height = ((resolution.height / this.drawingZone.height) - Math.abs(diffRatio)) * this.drawingZone.height;
        return resolution;
    };
    SvelteTonePixiInterfaceGateway.prototype.changeGamePhase = function (gamePhase) {
        stores_1.gamePhaseStore.set(gamePhase);
        return Promise.resolve();
    };
    SvelteTonePixiInterfaceGateway.prototype.removeEntityInterfaceState = function (id) {
        this.pixiEntities["delete"](id);
        return Promise.resolve();
    };
    SvelteTonePixiInterfaceGateway.prototype.updateEntityInterfaceState = function (id, interfaceEntityState) {
        var pixiEntity = this.pixiEntities.get(id);
        return pixiEntity
            ? this.updatePixiEntity(pixiEntity, interfaceEntityState)
            : this.createPixiEntity(id, interfaceEntityState);
    };
    SvelteTonePixiInterfaceGateway.prototype.createPixiEntity = function (entityId, interfaceEntityState) {
        var textureSourceUrl = this.textureSources.get(interfaceEntityState.spriteType);
        if (!textureSourceUrl)
            return Promise.reject(new Error(missingSpriteType(interfaceEntityState.spriteType)));
        var sprite = this.pixiApplication.stage.addChild(pixi_js_1.Sprite.from(textureSourceUrl));
        this.pixiEntities.set(entityId, {
            position: interfaceEntityState.position,
            spriteType: interfaceEntityState.spriteType,
            pixiSprite: sprite
        });
        var pixiEntity = this.pixiEntities.get(entityId);
        return pixiEntity
            ? this.updatePixiEntityGraphically(pixiEntity)
            : Promise.reject(new Error(entityIdMissingOnPixiEntities(entityId)));
    };
    SvelteTonePixiInterfaceGateway.prototype.updatePixiEntity = function (pixiEntity, interfaceEntityState) {
        pixiEntity.position = interfaceEntityState.position;
        pixiEntity.spriteType = interfaceEntityState.spriteType;
        return this.updatePixiEntityGraphically(pixiEntity);
    };
    SvelteTonePixiInterfaceGateway.prototype.disableAutoplay = function () {
        stores_1.autoplayStore.set(false);
        return Promise.resolve();
    };
    SvelteTonePixiInterfaceGateway.prototype.enableAutoplay = function () {
        stores_1.autoplayStore.set(true);
        return Promise.resolve();
    };
    SvelteTonePixiInterfaceGateway.prototype.changeMusicVolumeLevel = function (volume) {
        this.musicVolumeFader.volume.value = Tone.gainToDb(volume / 100);
        stores_1.musicVolumeStore.set(volume);
        return Promise.resolve();
    };
    SvelteTonePixiInterfaceGateway.prototype.changeSoundVolumeLevel = function (volume) {
        this.soundVolumeFader.volume.value = Tone.gainToDb(volume / 100);
        stores_1.soundVolumeStore.set(volume);
        return Promise.resolve();
    };
    SvelteTonePixiInterfaceGateway.prototype.load = function () {
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
    SvelteTonePixiInterfaceGateway.prototype.playMusic = function (music) {
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
    SvelteTonePixiInterfaceGateway.prototype.playSound = function (sound) {
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
    SvelteTonePixiInterfaceGateway.prototype.retrieveCurrentView = function () {
        return Promise.resolve(this.currentView);
    };
    SvelteTonePixiInterfaceGateway.prototype.notify = function (notification) {
        console.log('NOTIFY', notification.message);
        return Promise.resolve();
    };
    SvelteTonePixiInterfaceGateway.prototype.updateCleavage = function (cleavage) {
        console.log('UPDATE_CLEAVAGE', cleavage);
        stores_1.currentCleavageStore.set(cleavage);
        return Promise.resolve();
    };
    SvelteTonePixiInterfaceGateway.prototype.changeView = function (interfaceView) {
        console.log('CHANGE_VIEW', interfaceView);
        this.currentView = interfaceView;
        stores_1.interfaceViewStore.set(interfaceView);
        return Promise.resolve();
    };
    SvelteTonePixiInterfaceGateway.prototype.onMusicReadyToPlay = function (music, musicToPlay) {
        console.log('PLAYING_MUSIC', music.supportedMusic);
        var player = new Tone.Player(musicToPlay).connect(this.musicVolumeFader);
        player.loop = true;
        player.start();
        return Promise.resolve();
    };
    SvelteTonePixiInterfaceGateway.prototype.onSoundReadyToPlay = function (supportedSound, soundToPlay) {
        console.log('PLAYING_SOUND', supportedSound);
        var player = new Tone.Player(soundToPlay).connect(this.soundVolumeFader);
        player.start();
        return Promise.resolve();
    };
    return SvelteTonePixiInterfaceGateway;
}(PixiApplicationCommon_1.PixiApplicationCommon));
exports.SvelteTonePixiInterfaceGateway = SvelteTonePixiInterfaceGateway;
var toneIsNotReady = 'Tone is not ready';
var soundBufferIsNotLoaded = function (sound) { return "Tone sound buffer ".concat(sound.type, " is not loaded."); };
var musicBufferIsNotLoaded = function (music) { return "Tone music buffer ".concat(music.supportedMusic, " is not loaded."); };
var missingSoundOnSoundAssets = function (sound) { return "Missing sound ".concat(sound.type, " on sound assets."); };
var missingMusicOnMusicAssets = function (music) { return "Missing music ".concat(music.supportedMusic, " on sound assets."); };
