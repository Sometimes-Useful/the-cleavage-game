"use strict";
exports.__esModule = true;
exports.PixiApplicationCommon = void 0;
var PixiApplicationCommon = /** @class */ (function () {
    function PixiApplicationCommon() {
        this.drawingZone = { width: 24, height: 24 };
        this.offset = 0;
    }
    PixiApplicationCommon.prototype.relativePositionToAbsolutePosition = function (entityRelativePosition, offset, resolution) {
        var scaleRatio = this.retrieveScaleRatio(resolution);
        return {
            x: entityRelativePosition.x * scaleRatio.width + offset * scaleRatio.width,
            y: entityRelativePosition.y * scaleRatio.height + offset * scaleRatio.height
        };
    };
    PixiApplicationCommon.prototype.absolutePositionToRelativePosition = function (entityRelativePosition, resolution) {
        var scaleRatio = this.retrieveScaleRatio(resolution);
        var relativePosition = {
            width: entityRelativePosition.x / scaleRatio.width - this.offset / scaleRatio.width,
            height: entityRelativePosition.y / scaleRatio.height - this.offset / scaleRatio.height
        };
        return relativePosition;
    };
    PixiApplicationCommon.prototype.retrieveScaleRatio = function (resolution) {
        return {
            width: resolution.width / this.drawingZone.width,
            height: resolution.height / this.drawingZone.height
        };
    };
    return PixiApplicationCommon;
}());
exports.PixiApplicationCommon = PixiApplicationCommon;
