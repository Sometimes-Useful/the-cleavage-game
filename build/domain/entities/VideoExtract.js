"use strict";
exports.__esModule = true;
exports.VideoExtract = void 0;
var VideoExtract = /** @class */ (function () {
    function VideoExtract(choice, percentage, youtubeVideoId, startExtractSeconds, endExtractSeconds) {
        this.choice = choice;
        this.percentage = percentage;
        this.youtubeVideoId = youtubeVideoId;
        this.startExtractSeconds = startExtractSeconds;
        this.endExtractSeconds = endExtractSeconds;
    }
    return VideoExtract;
}());
exports.VideoExtract = VideoExtract;
