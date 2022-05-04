"use strict";
exports.__esModule = true;
exports.PixiApplicationCommon = void 0;
var PixiApplicationCommon = /** @class */ (function () {
    function PixiApplicationCommon() {
        this.drawingZone = { width: 18, height: 18 };
        this.offset = { width: 6, height: 6 };
    }
    PixiApplicationCommon.prototype.relativePositionToAbsolutePosition = function (entityRelativePosition, resolution) {
        var scaleRatio = this.retrieveScaleRatio(resolution);
        return {
            x: entityRelativePosition.x * scaleRatio.width + this.offset.width * scaleRatio.width,
            y: entityRelativePosition.y * scaleRatio.height + this.offset.height * scaleRatio.height
        };
    };
    PixiApplicationCommon.prototype.absolutePositionToRelativePosition = function (entityRelativePosition, resolution) {
        var scaleRatio = this.retrieveScaleRatio(resolution);
        var relativePosition = {
            width: entityRelativePosition.x / scaleRatio.width - this.offset.width / scaleRatio.width,
            height: entityRelativePosition.y / scaleRatio.height - this.offset.height / scaleRatio.height
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
