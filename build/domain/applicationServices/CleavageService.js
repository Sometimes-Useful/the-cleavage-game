"use strict";
exports.__esModule = true;
exports.CleavageApplicationService = void 0;
var Cleavage_1 = require("../entities/Cleavage");
var MessageForPlayer_1 = require("../entities/MessageForPlayer");
var PlayerCleave_1 = require("../entities/PlayerCleave");
var CleavageApplicationService = /** @class */ (function () {
    function CleavageApplicationService(publicCleavageDrawPileRepository, globalCleavageDrawPileGateway, currentCleavageRepository, chatGateway) {
        this.publicCleavageDrawPileRepository = publicCleavageDrawPileRepository;
        this.globalCleavageDrawPileGateway = globalCleavageDrawPileGateway;
        this.currentCleavageRepository = currentCleavageRepository;
        this.chatGateway = chatGateway;
    }
    CleavageApplicationService.prototype.saveGlobalCleavage = function (cleavage) {
        var currentClevageDto = cleavage.toDto();
        currentClevageDto.players = [];
        return this.globalCleavageDrawPileGateway.save(new Cleavage_1.Cleavage(currentClevageDto));
    };
    CleavageApplicationService.prototype.removePlayerOnCleavage = function (player) {
        var _this = this;
        return this.loadCleavage()
            .then(function (cleavage) {
            cleavage.leftChoice.players = cleavage.leftChoice.players.filter(function (cleavePlayer) { return cleavePlayer.username !== player.username; });
            cleavage.rightChoice.players = cleavage.rightChoice.players.filter(function (cleavePlayer) { return cleavePlayer.username !== player.username; });
            cleavage.players = cleavage.players.filter(function (cleavePlayer) { return cleavePlayer.username !== player.username; });
            return _this.saveCleavage(cleavage);
        })["catch"](function (error) { return Promise.reject(error); });
    };
    CleavageApplicationService.prototype.addPlayerOnCleavage = function (player) {
        var _this = this;
        return this.loadCleavage()
            .then(function (cleavage) {
            cleavage.players.push(player);
            return _this.saveCleavage(cleavage);
        })["catch"](function (error) { return Promise.reject(error); });
    };
    CleavageApplicationService.prototype.isPublicCleavageExist = function (cleavage) {
        return this.publicCleavageDrawPileRepository.isCleavageExistByTitle(cleavage);
    };
    CleavageApplicationService.prototype.addPublicCleavage = function (cleavage) {
        return this.publicCleavageDrawPileRepository.addCleavage(cleavage);
    };
    CleavageApplicationService.prototype.loadCleavage = function () {
        return this.currentCleavageRepository.load();
    };
    CleavageApplicationService.prototype.hasCleavage = function () {
        return this.currentCleavageRepository.hasCleavage();
    };
    CleavageApplicationService.prototype.playerCleave = function (event) {
        var _this = this;
        return this.currentCleavageRepository.load()
            .then(function (cleavage) { return _this.onCleave(cleavage, event); })["catch"](function (error) { return Promise.reject(error); });
    };
    CleavageApplicationService.prototype.saveCleavage = function (cleavage) {
        return this.currentCleavageRepository.save(cleavage);
    };
    CleavageApplicationService.prototype.onCleave = function (cleavage, event) {
        if (!cleavage.players.some(function (player) { return player.username === event.player.username; }))
            cleavage.players.push(event.player);
        var playerPreviousCleave = this.previousPlayerCleave(cleavage, event);
        return playerPreviousCleave !== PlayerCleave_1.PlayerCleave.NOTHING
            ? this.onPlayerAlreadyCleave(event, playerPreviousCleave, cleavage)
            : this.cleave(event, cleavage);
    };
    CleavageApplicationService.prototype.previousPlayerCleave = function (cleavage, event) {
        return cleavage.leftChoice.players.some(function (player) { return player.username === event.player.username; })
            ? PlayerCleave_1.PlayerCleave.LEFT
            : cleavage.rightChoice.players.some(function (player) { return player.username === event.player.username; })
                ? PlayerCleave_1.PlayerCleave.RIGHT
                : PlayerCleave_1.PlayerCleave.NOTHING;
    };
    CleavageApplicationService.prototype.cleave = function (event, cleavage) {
        if (event.playerCleave === PlayerCleave_1.PlayerCleave.LEFT)
            cleavage.leftChoice.players.push(event.player);
        if (event.playerCleave === PlayerCleave_1.PlayerCleave.RIGHT)
            cleavage.rightChoice.players.push(event.player);
        return this.saveCleavage(cleavage);
    };
    CleavageApplicationService.prototype.onPlayerAlreadyCleave = function (event, previousPlayerCleave, cleavage) {
        var _this = this;
        return event.playerCleave === previousPlayerCleave
            ? this.chatGateway.sendMessageToPlayer(new MessageForPlayer_1.MessageForPlayer(event.player, "You have still cleave ".concat(previousPlayerCleave)))
            : this.uncleave(event, previousPlayerCleave, cleavage)
                .then(function (cleavage) { return _this.cleave(event, cleavage); })["catch"](function (error) { return Promise.reject(error); });
    };
    CleavageApplicationService.prototype.uncleave = function (event, previousPlayerCleave, cleavage) {
        if (previousPlayerCleave === PlayerCleave_1.PlayerCleave.LEFT)
            cleavage.leftChoice.players = cleavage.leftChoice.players.filter(function (player) { return player.username !== event.player.username; });
        if (previousPlayerCleave === PlayerCleave_1.PlayerCleave.RIGHT)
            cleavage.rightChoice.players = cleavage.rightChoice.players.filter(function (player) { return player.username !== event.player.username; });
        return Promise.resolve(cleavage);
    };
    CleavageApplicationService.prototype.nextPublicCleavage = function () {
        return this.publicCleavageDrawPileRepository.nextCleavage();
    };
    CleavageApplicationService.prototype.randomGlobalCleavage = function () {
        return this.globalCleavageDrawPileGateway.drawGlobalCleavage();
    };
    return CleavageApplicationService;
}());
exports.CleavageApplicationService = CleavageApplicationService;
