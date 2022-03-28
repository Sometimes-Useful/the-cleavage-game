"use strict";
exports.__esModule = true;
exports.theInterfaceGatewayHasCurrentGamePhase = exports.theInterfaceGatewayHasEntityInterfaceState = exports.theInterfaceGatewayHasAutoplayOptionEnabled = exports.theInterfaceGatewayHasAutoplayOptionDisabled = exports.theInterfaceGatewayDontPlayMusic = exports.theInterfaceGatewayHasPlayingMusic = exports.theInterfaceGatewayHasCurrentMusicVolume = exports.theInterfaceGatewayHasCurrentSoundVolume = exports.theInterfaceGatewayHasPlayingSounds = exports.theInterfaceGatewayDontHaveCleavage = exports.theInterfaceGatewayHasCurrentCleavage = exports.theInterfaceGatewayHasCurrentView = exports.theInterfaceGatewayHasNotifications = void 0;
var chai_1 = require("chai");
var mocha_1 = require("mocha");
var unitTests_1 = require("./unitTests");
var theInterfaceGatewayHasNotifications = function (gherkinPrefix, application, expectedNotifications) {
    var notifications = Array.isArray(expectedNotifications) ? expectedNotifications : [expectedNotifications];
    return (0, mocha_1.it)("".concat(gherkinPrefix, " the notifications are sents : ").concat(notifications.map(function (notification) { return JSON.stringify(notification); }).join(',\n')), function () {
        (0, chai_1.expect)(application.gateways.interface.notifications).deep.equal(notifications);
    });
};
exports.theInterfaceGatewayHasNotifications = theInterfaceGatewayHasNotifications;
var theInterfaceGatewayHasCurrentView = function (gherkinPrefix, application, expectedInterfaceView) {
    return (0, mocha_1.it)("".concat(gherkinPrefix, " the interface gateway has the current view '").concat(expectedInterfaceView, "'."), function () {
        if ((0, unitTests_1.isGiven)(gherkinPrefix))
            application.gateways.interface.currentView = expectedInterfaceView;
        (0, chai_1.expect)(application.gateways.interface.currentView).equal(expectedInterfaceView);
    });
};
exports.theInterfaceGatewayHasCurrentView = theInterfaceGatewayHasCurrentView;
var theInterfaceGatewayHasCurrentCleavage = function (gherkinPrefix, application, expectedCleavage) {
    return (0, mocha_1.it)("".concat(gherkinPrefix, " the interface gateway has the current cleavage : '").concat((0, unitTests_1.stringifyWithDetailledSetAndMap)(expectedCleavage), "'."), function () {
        if ((0, unitTests_1.isGiven)(gherkinPrefix))
            application.gateways.interface.currentCleavage = expectedCleavage;
        (0, chai_1.expect)(application.gateways.interface.currentCleavage).deep.equal(expectedCleavage, (0, unitTests_1.detailedComparisonMessage)(application.gateways.interface.currentCleavage, expectedCleavage));
    });
};
exports.theInterfaceGatewayHasCurrentCleavage = theInterfaceGatewayHasCurrentCleavage;
var theInterfaceGatewayDontHaveCleavage = function (gherkinPrefix, application) {
    return (0, mocha_1.it)("".concat(gherkinPrefix, " the interface gateway don't have cleavage."), function () { return (0, chai_1.expect)(application.gateways.interface.currentCleavage).equal(undefined); });
};
exports.theInterfaceGatewayDontHaveCleavage = theInterfaceGatewayDontHaveCleavage;
var theInterfaceGatewayHasPlayingSounds = function (gherkinPrefix, application, expectedPlayingSounds) {
    var sounds = Array.isArray(expectedPlayingSounds) ? expectedPlayingSounds : [expectedPlayingSounds];
    return (0, mocha_1.it)("".concat(gherkinPrefix, " the interface gateway is playing sounds : '").concat(JSON.stringify(sounds), "'."), function () {
        if ((0, unitTests_1.isGiven)(gherkinPrefix))
            application.gateways.interface.playingSounds = sounds;
        (0, chai_1.expect)(application.gateways.interface.playingSounds).deep.equal(sounds);
    });
};
exports.theInterfaceGatewayHasPlayingSounds = theInterfaceGatewayHasPlayingSounds;
var theInterfaceGatewayHasCurrentSoundVolume = function (gherkinPrefix, application, expectedSoundVolume) {
    return (0, mocha_1.it)("".concat(gherkinPrefix, " the interface gateway has current music volume set to '").concat(expectedSoundVolume, "'."), function () {
        if ((0, unitTests_1.isGiven)(gherkinPrefix))
            application.gateways.interface.soundVolume = expectedSoundVolume;
        (0, chai_1.expect)(application.gateways.interface.soundVolume).deep.equal(expectedSoundVolume);
    });
};
exports.theInterfaceGatewayHasCurrentSoundVolume = theInterfaceGatewayHasCurrentSoundVolume;
var theInterfaceGatewayHasCurrentMusicVolume = function (gherkinPrefix, application, expectedMusicVolume) {
    return (0, mocha_1.it)("".concat(gherkinPrefix, " the interface gateway has current music volume set to '").concat(expectedMusicVolume, "'."), function () {
        if ((0, unitTests_1.isGiven)(gherkinPrefix))
            application.gateways.interface.musicVolume = expectedMusicVolume;
        (0, chai_1.expect)(application.gateways.interface.musicVolume).deep.equal(expectedMusicVolume);
    });
};
exports.theInterfaceGatewayHasCurrentMusicVolume = theInterfaceGatewayHasCurrentMusicVolume;
var theInterfaceGatewayHasPlayingMusic = function (gherkinPrefix, application, expectedPlayingMusic) {
    return (0, mocha_1.it)("".concat(gherkinPrefix, " the interface gateway is playing music : '").concat(JSON.stringify(expectedPlayingMusic), "'."), function () {
        if ((0, unitTests_1.isGiven)(gherkinPrefix))
            application.gateways.interface.playingMusic = expectedPlayingMusic;
        (0, chai_1.expect)(application.gateways.interface.playingMusic).deep.equal(expectedPlayingMusic);
    });
};
exports.theInterfaceGatewayHasPlayingMusic = theInterfaceGatewayHasPlayingMusic;
var theInterfaceGatewayDontPlayMusic = function (gherkinPrefix, application) {
    return (0, mocha_1.it)("".concat(gherkinPrefix, " the interface gateway don't play music."), function () {
        if ((0, unitTests_1.isGiven)(gherkinPrefix))
            application.gateways.interface.playingMusic = undefined;
        (0, chai_1.expect)(application.gateways.interface.playingMusic).equal(undefined);
    });
};
exports.theInterfaceGatewayDontPlayMusic = theInterfaceGatewayDontPlayMusic;
var theInterfaceGatewayHasAutoplayOptionDisabled = function (gherkinPrefix, application) {
    return (0, mocha_1.it)("".concat(gherkinPrefix, " the interface gateway has autoplay option disabled"), function () {
        if ((0, unitTests_1.isGiven)(gherkinPrefix))
            application.gateways.interface.autoplayEnabled = false;
        (0, chai_1.expect)(application.gateways.interface.autoplayEnabled).equal(false);
    });
};
exports.theInterfaceGatewayHasAutoplayOptionDisabled = theInterfaceGatewayHasAutoplayOptionDisabled;
var theInterfaceGatewayHasAutoplayOptionEnabled = function (gherkinPrefix, application) {
    return (0, mocha_1.it)("".concat(gherkinPrefix, " the interface gateway has autoplay option enabled"), function () {
        if ((0, unitTests_1.isGiven)(gherkinPrefix))
            application.gateways.interface.autoplayEnabled = true;
        (0, chai_1.expect)(application.gateways.interface.autoplayEnabled).equal(true);
    });
};
exports.theInterfaceGatewayHasAutoplayOptionEnabled = theInterfaceGatewayHasAutoplayOptionEnabled;
var theInterfaceGatewayHasEntityInterfaceState = function (gherkinPrefix, application, interfaceEntitiesState) {
    return (0, mocha_1.it)("".concat(gherkinPrefix, " the interface gateway has entity interface state"), function () {
        if ((0, unitTests_1.isGiven)(gherkinPrefix))
            application.gateways.interface.interfaceEntitiesState = interfaceEntitiesState;
        (0, chai_1.expect)(application.gateways.interface.interfaceEntitiesState).deep.equal(interfaceEntitiesState, (0, unitTests_1.detailedComparisonMessage)(application.gateways.interface.interfaceEntitiesState, interfaceEntitiesState));
    });
};
exports.theInterfaceGatewayHasEntityInterfaceState = theInterfaceGatewayHasEntityInterfaceState;
var theInterfaceGatewayHasCurrentGamePhase = function (gherkinPrefix, application, gamePhase) {
    return (0, mocha_1.it)("".concat(gherkinPrefix, " the interface gateway has game phase ").concat(gamePhase), function () {
        if ((0, unitTests_1.isGiven)(gherkinPrefix))
            application.gateways.interface.gamePhase = gamePhase;
        (0, chai_1.expect)(application.gateways.interface.gamePhase).deep.equal(gamePhase);
    });
};
exports.theInterfaceGatewayHasCurrentGamePhase = theInterfaceGatewayHasCurrentGamePhase;
