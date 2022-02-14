"use strict";
exports.__esModule = true;
exports.PrimaryClientController = void 0;
var EventType_1 = require("../../events/EventType");
var ApplicationStartUseCase_1 = require("../../usecases/ApplicationStartUseCase");
var AskForHelpUseCase_1 = require("../../usecases/AskForHelpUseCase");
var CancelCleavageUseCase_1 = require("../../usecases/CancelCleavageUseCase");
var ChangeMusicVolumeUseCase_1 = require("../../usecases/ChangeMusicVolumeUseCase");
var ChangeSoundVolumeUseCase_1 = require("../../usecases/ChangeSoundVolumeUseCase");
var NavigateUseCase_1 = require("../../usecases/NavigateUseCase");
var PlayerApplauseEvent_1 = require("../../usecases/PlayerApplauseEvent");
var PlayerCleaveUseCase_1 = require("../../usecases/PlayerCleaveUseCase");
var PlayerHyperLikeUseCase_1 = require("../../usecases/PlayerHyperLikeUseCase");
var PlayerQuitUseCase_1 = require("../../usecases/PlayerQuitUseCase");
var PlayerShootUseCase_1 = require("../../usecases/PlayerShootUseCase");
var PlayerWhistleUseCase_1 = require("../../usecases/PlayerWhistleUseCase");
var SuggestCleavageUseCase_1 = require("../../usecases/SuggestCleavageUseCase");
var LaunchCleavageUseCase_1 = require("../../usecases/LaunchCleavageUseCase");
var DisconnectChatUseCase_1 = require("../../usecases/DisconnectChatUseCase");
var DrawCleavageUseCase_1 = require("../../usecases/DrawCleavageUseCase");
var NewCleavageUseCase_1 = require("../../usecases/NewCleavageUseCase");
var ConnectChatUseCase_1 = require("../../usecases/ConnectChatUseCase");
var messages_1 = require("../../messages/messages");
var PlayerMessageUseCase_1 = require("../../usecases/PlayerMessageUseCase");
var CheckAutoplayUseCase_1 = require("../../usecases/CheckAutoplayUseCase");
var StartAutoplayUseCase_1 = require("../../usecases/StartAutoplayUseCase");
var StopAutoplayUseCase_1 = require("../../usecases/StopAutoplayUseCase");
var PrimaryClientController = /** @class */ (function () {
    function PrimaryClientController(applicationServices) {
        this.applicationServices = applicationServices;
        this.useCases = new Map([]);
        this.useCases.set(EventType_1.EventType.DISCONNECT_CHAT, new DisconnectChatUseCase_1.DisconnectChatUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.CONNECT_CHAT, new ConnectChatUseCase_1.ConnectChatUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.NEW_CLEAVAGE, new NewCleavageUseCase_1.NewCleavageUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.LAUNCH_CLEAVAGE, new LaunchCleavageUseCase_1.LaunchCleavageUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.PLAYER_MESSAGE, new PlayerMessageUseCase_1.PlayerMessageUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.PLAYER_CLEAVE, new PlayerCleaveUseCase_1.PlayerCleaveUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.DRAW_CLEAVAGE, new DrawCleavageUseCase_1.DrawCleavageUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.PLAYER_SUGGEST_CLEAVAGE, new SuggestCleavageUseCase_1.SuggestCleavageUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.PLAYER_ASK_FOR_HELP, new AskForHelpUseCase_1.AskForHelpUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.CANCEL_CLEAVAGE, new CancelCleavageUseCase_1.CancelCleavageUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.PLAYER_APPLAUSE, new PlayerApplauseEvent_1.PlayerApplauseUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.PLAYER_HYPERLIKE, new PlayerHyperLikeUseCase_1.PlayerHyperLikeUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.PLAYER_WHISTLE, new PlayerWhistleUseCase_1.PlayerWhistleUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.PLAYER_SHOOT, new PlayerShootUseCase_1.PlayerShootUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.APPLICATION_START, new ApplicationStartUseCase_1.ApplicationStartUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.NAVIGATE, new NavigateUseCase_1.NavigateUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.CHANGE_MUSIC_VOLUME, new ChangeMusicVolumeUseCase_1.ChangeMusicVolumeUseCase(this.applicationServices.interface));
        this.useCases.set(EventType_1.EventType.CHANGE_SOUND_VOLUME, new ChangeSoundVolumeUseCase_1.ChangeSoundVolumeUseCase(this.applicationServices.interface));
        this.useCases.set(EventType_1.EventType.PLAYER_QUIT, new PlayerQuitUseCase_1.PlayerQuitUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.START_AUTOPLAY, new StartAutoplayUseCase_1.StartAutoplayUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.CHECK_AUTOPLAY, new CheckAutoplayUseCase_1.CheckAutoplayUseCase(this.applicationServices));
        this.useCases.set(EventType_1.EventType.STOP_AUTOPLAY, new StopAutoplayUseCase_1.StopAutoplayUseCase(this.applicationServices));
    }
    PrimaryClientController.prototype.executeEvent = function (event) {
        var usecase = this.useCases.get(event.eventType);
        return usecase
            ? usecase.execute(event)
            : Promise.reject(new Error((0, messages_1.eventNotSupported)(event, this)));
    };
    return PrimaryClientController;
}());
exports.PrimaryClientController = PrimaryClientController;
