"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.InMemoryPlayerRepository = void 0;
var InMemoryPlayerRepository = /** @class */ (function () {
    function InMemoryPlayerRepository() {
        this.currentPlayers = new Map();
    }
    InMemoryPlayerRepository.prototype.playerByUsername = function (username) {
        var player = this.currentPlayers.get(username);
        return player
            ? Promise.resolve(player)
            : Promise.reject(new Error("Player with username '".concat(username, "' not found.")));
    };
    InMemoryPlayerRepository.prototype.hasPlayer = function (player) {
        return Promise.resolve(this.currentPlayers.has(player.username));
    };
    InMemoryPlayerRepository.prototype.loadAllPlayers = function () {
        return Promise.resolve(__spreadArray([], __read(this.currentPlayers.values()), false));
    };
    InMemoryPlayerRepository.prototype.remove = function (player) {
        this.currentPlayers["delete"](player.username);
        return Promise.resolve();
    };
    InMemoryPlayerRepository.prototype.save = function (player) {
        this.currentPlayers.set(player.username, player);
        return Promise.resolve();
    };
    return InMemoryPlayerRepository;
}());
exports.InMemoryPlayerRepository = InMemoryPlayerRepository;
