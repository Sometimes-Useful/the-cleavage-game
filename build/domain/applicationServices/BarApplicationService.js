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
exports.__esModule = true;
exports.BarApplicationService = void 0;
var InterfaceView_1 = require("../entities/InterfaceView");
var InstallNewStoolsOnBarEvent_1 = require("../events/installNewStoolOnBar/InstallNewStoolsOnBarEvent");
var DrawEvent_1 = require("../events/draw/DrawEvent");
var InstallNewStoolsOnTableEvent_1 = require("../events/installNewStoolOnTable/InstallNewStoolsOnTableEvent");
var InstallNewTableEvent_1 = require("../events/installNewTable/InstallNewTableEvent");
var NavigateEvent_1 = require("../events/navigateEvent/NavigateEvent");
var PlayerMoveEvent_1 = require("../events/playerMove/PlayerMoveEvent");
var PlayerQuitEvent_1 = require("../events/playerQuit/PlayerQuitEvent");
var TableStoolAvailableEvent_1 = require("../events/tableStoolAvailable/TableStoolAvailableEvent");
var Direction_1 = require("./Direction");
var Sprite_1 = require("../events/playerMove/Sprite");
var GamePhase_1 = require("../entities/GamePhase");
var ChangeGamePhaseEvent_1 = require("../events/changeGamePhase/ChangeGamePhaseEvent");
var BarApplicationService = /** @class */ (function () {
    function BarApplicationService(barRepository, eventGateway, uuidGateway) {
        this.barRepository = barRepository;
        this.eventGateway = eventGateway;
        this.uuidGateway = uuidGateway;
        this.stoolRowsPerTables = 2;
        this.stoolsPerStoolRow = 3;
        this.stoolDiameter = 0.4;
        this.defaultTableHorizontalOffset = 3.1;
        this.defaultTableVerticalOffset = 2;
        this.tableSize = { height: 0.8, width: 2.4 };
        this.firstTablePosition = { x: -0.2, y: -2 };
        this.defaultBarPosition = { x: 0, y: 0 };
        this.defaultBarSize = { width: 8.2, height: 6.8 };
        this.firstStoolOffset = { x: 0.6, y: -0.4 };
    }
    BarApplicationService.prototype.installStoolForBar = function () {
        var _this = this;
        var stools = this.makeBarStools();
        return Promise.all(stools.map(function (stool) { return _this.uuidGateway.nextId(); }))
            .then(function (uuids) {
            uuids.forEach(function (uuid, index) { stools[index].id = uuid; });
            return Promise.all(stools.map(function (stool) { return _this.barRepository.addAvailableBarStool(stool); }));
        })
            .then(function (results) { return _this.eventGateway.sendEvents(stools.map(function (stool) { return new DrawEvent_1.DrawEvent(stool.id, { position: stool.position, sprite: Sprite_1.Sprite.STOOL }); })); })["catch"](function (error) { return Promise.reject(error); });
    };
    BarApplicationService.prototype.makeBarStools = function () {
        var barStools = [];
        for (var stoolColumnIndex = 0; stoolColumnIndex < 2; stoolColumnIndex++)
            for (var stoolIndex = 0; stoolIndex < 9; stoolIndex++) {
                var isStoolOnBarExit = stoolColumnIndex !== 0 && (stoolIndex === 3 || stoolIndex === 4);
                if (isStoolOnBarExit)
                    continue;
                barStools.push({
                    id: '',
                    size: { width: this.stoolDiameter, height: this.stoolDiameter },
                    position: {
                        x: this.precisionRound(this.firstStoolOffset.x + stoolIndex * 0.8, 3),
                        y: this.precisionRound(this.firstStoolOffset.y + (stoolColumnIndex === 0 ? 0 : 7.2), 3)
                    }
                });
            }
        return barStools;
    };
    BarApplicationService.prototype.installBar = function () {
        var _this = this;
        return this.uuidGateway.nextId()
            .then(function (uuid) { return _this.onBarUuid(uuid); })["catch"](function (error) { return Promise.reject(error); });
    };
    BarApplicationService.prototype.onBarUuid = function (uuid) {
        var _this = this;
        return this.barRepository.installBar({
            position: this.defaultBarPosition,
            size: this.defaultBarSize,
            id: uuid
        })
            .then(function () { return _this.eventGateway.sendEvents([
            new InstallNewStoolsOnBarEvent_1.InstallNewStoolsOnBarEvent(),
            new DrawEvent_1.DrawEvent(uuid, { position: _this.defaultBarPosition, sprite: Sprite_1.Sprite.BAR }),
            new NavigateEvent_1.NavigateEvent(InterfaceView_1.InterfaceView.GAME),
            new ChangeGamePhaseEvent_1.ChangeGamePhaseEvent(GamePhase_1.GamePhase.NEW_CLEAVAGE)
        ]); })["catch"](function (error) { return Promise.reject(error); });
    };
    BarApplicationService.prototype.askForNewTable = function () {
        return this.eventGateway.sendEvent(new InstallNewTableEvent_1.InstallNewTableEvent());
    };
    BarApplicationService.prototype.onOccupiedBarStool = function (occupiedStool) {
        var _this = this;
        return this.barRepository.freeBarStool(occupiedStool.username)
            .then(function () { return _this.barRepository.nextAvailableTableStool(); })
            .then(function (tableStool) { return _this.occupyTableStool(tableStool, occupiedStool.username); })["catch"](function (error) { return Promise.reject(error); });
    };
    BarApplicationService.prototype.occupyTableStool = function (tableStool, username) {
        var _this = this;
        return this.barRepository.setOccupiedTableStool(username, tableStool)
            .then(function () { return _this.eventGateway.sendEvent(new PlayerMoveEvent_1.PlayerMoveEvent(username, tableStool.position)); })["catch"](function (error) { return Promise.reject(error); });
    };
    BarApplicationService.prototype.nextOccupiedBarStool = function () {
        return this.barRepository.nextOccupiedBarStool();
    };
    BarApplicationService.prototype.installStoolForTable = function (tableId) {
        var _this = this;
        return this.barRepository.retrieveTableById(tableId)
            .then(function (table) { return _this.stoolsForTable(table); })
            .then(function (stools) { return _this.onStoolsForTable(stools); })["catch"](function (error) { return Promise.reject(error); });
    };
    BarApplicationService.prototype.installNewTable = function () {
        var _this = this;
        return Promise.all([
            this.barRepository.retrieveTables(),
            this.barRepository.retrieveBar(),
            this.barRepository.retreiveTableDirection(),
            this.uuidGateway.nextId()
        ])
            .then(function (_a) {
            var _b = __read(_a, 4), tables = _b[0], bar = _b[1], direction = _b[2], uuid = _b[3];
            return tables.length > 0
                ? _this.onTables(uuid, tables, bar, direction)
                : _this.installTable({ id: uuid, size: _this.tableSize, position: _this.firstTablePosition });
        })["catch"](function (error) { return Promise.reject(error); });
    };
    BarApplicationService.prototype.onStoolsForTable = function (stools) {
        var _this = this;
        return Promise.all(stools.map(function (stool) { return _this.barRepository.addAvailableTableStool(stool); }))
            .then(function (results) { return Promise.all(stools.map(function (stool) { return _this.eventGateway.sendEvent(new TableStoolAvailableEvent_1.TableStoolAvailableEvent()); })); })
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    BarApplicationService.prototype.stoolsForTable = function (table) {
        var tableStoolsPromise = [];
        for (var tableStoolRow = 1; tableStoolRow <= this.stoolRowsPerTables; tableStoolRow++)
            for (var stoolIndexOnRow = 0; stoolIndexOnRow < this.stoolsPerStoolRow; stoolIndexOnRow++)
                tableStoolsPromise.push(this.makeStool(table, tableStoolRow, stoolIndexOnRow));
        return Promise.all(tableStoolsPromise);
    };
    BarApplicationService.prototype.makeStool = function (table, tableStoolRow, stoolIndexOnRaw) {
        var _this = this;
        return this.uuidGateway.nextId()
            .then(function (uuid) { return ({
            id: uuid,
            size: { width: _this.stoolDiameter, height: _this.stoolDiameter },
            position: _this.stoolPosition(table, tableStoolRow, stoolIndexOnRaw)
        }); })["catch"](function (error) { return Promise.reject(error); });
    };
    BarApplicationService.prototype.stoolPosition = function (table, tableStoolRow, stoolIndexOnRaw) {
        return {
            x: this.precisionRound(table.position.x + (this.stoolDiameter / 2 + stoolIndexOnRaw * this.stoolDiameter * 2), 3),
            y: this.precisionRound(table.position.y + (tableStoolRow % 2 === 0 ? this.stoolDiameter * 2 : -this.stoolDiameter), 3)
        };
    };
    BarApplicationService.prototype.onTables = function (uuid, tables, bar, direction) {
        var _this = this;
        return this.newTablePositionAndDirection(tables, bar, direction)
            .then(function (_a) {
            var position = _a.position, direction = _a.direction;
            return Promise.all([
                _this.installTable({ id: uuid, position: position, size: _this.tableSize }),
                _this.barRepository.updateTableDirection(direction)
            ]);
        })
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    BarApplicationService.prototype.newTablePositionAndDirection = function (tables, bar, direction) {
        var _this = this;
        var noXOffset = 0;
        var noYOffset = 0;
        var lastTable = tables[tables.length - 1];
        var changeDirectionStrategy = new Map([
            [Direction_1.Direction.UP, { isNoCollision: function () { return _this.isNoCollision(lastTable, __spreadArray([bar], __read(tables), false), _this.defaultTableHorizontalOffset, noYOffset); }, direction: Direction_1.Direction.RIGHT }],
            [Direction_1.Direction.RIGHT, { isNoCollision: function () { return _this.isNoCollision(lastTable, __spreadArray([bar], __read(tables), false), noXOffset, _this.defaultTableVerticalOffset); }, direction: Direction_1.Direction.DOWN }],
            [Direction_1.Direction.DOWN, { isNoCollision: function () { return _this.isNoCollision(lastTable, __spreadArray([bar], __read(tables), false), -_this.defaultTableHorizontalOffset, noYOffset); }, direction: Direction_1.Direction.LEFT }],
            [Direction_1.Direction.LEFT, { isNoCollision: function () { return _this.isNoCollision(lastTable, __spreadArray([bar], __read(tables), false), noXOffset, -_this.defaultTableVerticalOffset); }, direction: Direction_1.Direction.UP }]
        ]);
        var positionStrategy = new Map([
            [Direction_1.Direction.UP, { x: lastTable.position.x + noXOffset, y: lastTable.position.y - this.defaultTableVerticalOffset }],
            [Direction_1.Direction.RIGHT, { x: lastTable.position.x + this.defaultTableHorizontalOffset, y: lastTable.position.y + noYOffset }],
            [Direction_1.Direction.DOWN, { x: lastTable.position.x + noXOffset, y: lastTable.position.y + this.defaultTableVerticalOffset }],
            [Direction_1.Direction.LEFT, { x: lastTable.position.x - this.defaultTableHorizontalOffset, y: lastTable.position.y + noYOffset }]
        ]);
        var changeDirection = changeDirectionStrategy.get(direction);
        if (!changeDirection)
            return Promise.reject(new Error("Unsupported change direction strategy with direction ".concat(direction)));
        direction = changeDirection.isNoCollision() ? changeDirection.direction : direction;
        var position = positionStrategy.get(direction);
        return position
            ? Promise.resolve({ position: { x: this.precisionRound(position.x, 3), y: this.precisionRound(position.y, 3) }, direction: direction })
            : Promise.reject(new Error('Position undefined.'));
    };
    BarApplicationService.prototype.precisionRound = function (number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    };
    BarApplicationService.prototype.isNoCollision = function (entity1, entities, xOffsetEntity1, yOffsetEntity1) {
        var e_1, _a;
        var entity1Target = {
            id: entity1.id,
            size: entity1.size,
            position: {
                x: this.precisionRound(entity1.position.x + xOffsetEntity1, 3),
                y: this.precisionRound(entity1.position.y + yOffsetEntity1, 3)
            }
        };
        try {
            for (var entities_1 = __values(entities), entities_1_1 = entities_1.next(); !entities_1_1.done; entities_1_1 = entities_1.next()) {
                var entity = entities_1_1.value;
                var isOnX = entity1Target.position.x <= entity.position.x + entity.size.width && entity1Target.position.x + entity1Target.size.width >= entity.position.x;
                var isOnY = entity1Target.position.y <= entity.position.y + entity.size.height && entity1Target.position.y + entity1Target.size.height >= entity.position.y;
                // console.log(`${JSON.stringify(entity1Target)} ${JSON.stringify(entities)} ${isOnX} ${isOnY}`)
                if (isOnY && isOnX)
                    return false;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entities_1_1 && !entities_1_1.done && (_a = entities_1["return"])) _a.call(entities_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    };
    BarApplicationService.prototype.installTable = function (table) {
        var _this = this;
        console.log(JSON.stringify(table));
        return this.barRepository.addTable(table)
            .then(function () { return _this.eventGateway.sendEvent(new InstallNewStoolsOnTableEvent_1.InstallNewStoolsOnTableEvent(table.id)); })["catch"](function (error) { return Promise.reject(error); });
    };
    BarApplicationService.prototype.playerQuit = function (player) {
        return this.eventGateway.sendEvent(new PlayerQuitEvent_1.PlayerQuitEvent(player));
    };
    BarApplicationService.prototype.installPlayerOnBarStool = function (username) {
        var _this = this;
        return this.barRepository.nextAvailableBarStool()
            .then(function (stool) { return Promise.all([
            _this.barRepository.setOccupiedBarStool(username, stool),
            _this.eventGateway.sendEvent(new PlayerMoveEvent_1.PlayerMoveEvent(username, stool.position)),
            _this.eventGateway.sendEvent(new InstallNewTableEvent_1.InstallNewTableEvent())
        ]); })
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    BarApplicationService.prototype.installPlayerOnTableStool = function (username) {
        var _this = this;
        return this.barRepository.nextAvailableTableStool()
            .then(function (stool) { return Promise.all([
            _this.barRepository.setOccupiedTableStool(username, stool),
            _this.eventGateway.sendEvent(new PlayerMoveEvent_1.PlayerMoveEvent(username, stool.position))
        ]); })
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    BarApplicationService.prototype.hasAvailableTableStool = function () {
        return this.barRepository.hasAvailableTableStool();
    };
    BarApplicationService.prototype.hasAvailableBarStool = function () {
        return this.barRepository.hasAvailableBarStool();
    };
    return BarApplicationService;
}());
exports.BarApplicationService = BarApplicationService;
