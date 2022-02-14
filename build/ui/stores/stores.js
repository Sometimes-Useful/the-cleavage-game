"use strict";
exports.__esModule = true;
exports.autoplayStore = exports.soundVolumeStore = exports.musicVolumeStore = exports.interfaceViewStore = exports.currentCleavageStore = exports.applicationEventStore = void 0;
var store_1 = require("svelte/store");
var InterfaceView_1 = require("../../domain/entities/InterfaceView");
var defaultVolumeLevels_1 = require("../../infra/gateways/interface/defaultVolumeLevels");
exports.applicationEventStore = (0, store_1.writable)(undefined);
exports.currentCleavageStore = (0, store_1.writable)(undefined);
exports.interfaceViewStore = (0, store_1.writable)(InterfaceView_1.InterfaceView.NONE);
exports.musicVolumeStore = (0, store_1.writable)(defaultVolumeLevels_1.defaultMusicVolumeLevel);
exports.soundVolumeStore = (0, store_1.writable)(defaultVolumeLevels_1.defaultSoundVolumeLevel);
exports.autoplayStore = (0, store_1.writable)(false);