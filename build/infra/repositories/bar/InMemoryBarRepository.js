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
exports.InMemoryBarRepository = void 0;
var Direction_1 = require("../../../domain/applicationServices/Direction");
var InMemoryBarRepository = /** @class */ (function () {
    function InMemoryBarRepository() {
        this.availableTableStools = [];
        this.occupiedTableStools = new Map();
        this.availableBarStools = [];
        this.occupiedBarStools = new Map();
        this.tables = [];
        this.tableDirection = Direction_1.Direction.RIGHT;
        this.bar = { id: '0', position: { x: 0, y: 0 }, size: { height: 0, width: 0 } };
    }
    InMemoryBarRepository.prototype.isPlayerInstalledOnBarStool = function (username) {
        return Promise.resolve(!!this.occupiedBarStools.get(username));
    };
    InMemoryBarRepository.prototype.freeTableStool = function (username) {
        var tableStool = this.occupiedTableStools.get(username);
        if (!tableStool)
            return Promise.reject(new Error("Occupied bar stool with user ".concat(username, " not found.")));
        this.occupiedTableStools["delete"](username);
        this.availableTableStools.push(tableStool);
        return Promise.resolve();
    };
    InMemoryBarRepository.prototype.isPlayerInstalledOnTableStool = function (username) {
        return Promise.resolve(!!this.occupiedTableStools.get(username));
    };
    InMemoryBarRepository.prototype.addAvailableBarStool = function (stool) {
        this.availableBarStools.push(stool);
        return Promise.resolve();
    };
    InMemoryBarRepository.prototype.installBar = function (bar) {
        this.bar = bar;
        return Promise.resolve();
    };
    InMemoryBarRepository.prototype.freeBarStool = function (username) {
        var barStool = this.occupiedBarStools.get(username);
        if (!barStool)
            return Promise.reject(new Error("Occupied bar stool with user ".concat(username, " not found.")));
        this.occupiedBarStools["delete"](username);
        this.availableBarStools.push(barStool);
        return Promise.resolve();
    };
    InMemoryBarRepository.prototype.nextOccupiedBarStool = function () {
        var username = __spreadArray([], __read(this.occupiedBarStools.keys()), false).at(0);
        var occupiedBarStool = username ? this.occupiedBarStools.get(username) : undefined;
        return (username && occupiedBarStool)
            ? Promise.resolve({ username: username, stool: occupiedBarStool })
            : Promise.resolve(undefined);
    };
    InMemoryBarRepository.prototype.retrieveTableById = function (tableId) {
        var table = this.tables.find(function (table) { return table.id === tableId; });
        return table
            ? Promise.resolve(table)
            : Promise.reject(new Error("Table with id '".concat(tableId, "' missing on ").concat(this.constructor.name)));
    };
    InMemoryBarRepository.prototype.addAvailableTableStool = function (stool) {
        this.availableTableStools.push(stool);
        return Promise.resolve();
    };
    InMemoryBarRepository.prototype.updateTableDirection = function (direction) {
        this.tableDirection = direction;
        return Promise.resolve();
    };
    InMemoryBarRepository.prototype.retreiveTableDirection = function () {
        return Promise.resolve(this.tableDirection);
    };
    InMemoryBarRepository.prototype.retrieveBar = function () {
        return Promise.resolve(this.bar);
    };
    InMemoryBarRepository.prototype.retrieveTables = function () {
        return Promise.resolve(this.tables);
    };
    InMemoryBarRepository.prototype.addTable = function (table) {
        this.tables.push(table);
        return Promise.resolve();
    };
    InMemoryBarRepository.prototype.setOccupiedBarStool = function (username, stool) {
        this.occupiedBarStools.set(username, stool);
        return Promise.resolve();
    };
    InMemoryBarRepository.prototype.setOccupiedTableStool = function (username, stool) {
        this.occupiedTableStools.set(username, stool);
        return Promise.resolve();
    };
    InMemoryBarRepository.prototype.nextAvailableTableStool = function () {
        var nextAvailableStool = this.availableTableStools.shift();
        return nextAvailableStool
            ? Promise.resolve(nextAvailableStool)
            : Promise.reject(new Error('No table stool available.'));
    };
    InMemoryBarRepository.prototype.nextAvailableBarStool = function () {
        var nextAvailableBarStool = this.availableBarStools.shift();
        return nextAvailableBarStool
            ? Promise.resolve(nextAvailableBarStool)
            : Promise.reject(new Error('No bar stool available.'));
    };
    InMemoryBarRepository.prototype.hasAvailableTableStool = function () {
        return Promise.resolve(this.availableTableStools.length > 0);
    };
    InMemoryBarRepository.prototype.hasAvailableBarStool = function () {
        return Promise.resolve(this.availableBarStools.length > 0);
    };
    return InMemoryBarRepository;
}());
exports.InMemoryBarRepository = InMemoryBarRepository;
