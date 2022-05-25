import { EventType } from '../../events/EventType'
import type { ApplicationEvent } from '../../events/GameEvent'
import { eventNotSupported } from '../../messages/messages'
import { ApplicationStartUseCase } from '../../usecases/ApplicationStartUseCase'
import { AskForHelpUseCase } from '../../usecases/AskForHelpUseCase'
import { CancelCleavageUseCase } from '../../usecases/CancelCleavageUseCase'
import { ChangeGamePhaseUseCase } from '../../usecases/ChangeGamePhaseUseCase'
import { ChangeMusicVolumeUseCase } from '../../usecases/ChangeMusicVolumeUseCase'
import { ChangeSoundVolumeUseCase } from '../../usecases/ChangeSoundVolumeUseCase'
import { ChangeVideoExtractVolumeUseCase } from '../../usecases/ChangeVideoExtractVolumeUseCase'
import { CheckAutoplayUseCase } from '../../usecases/CheckAutoplayUseCase'
import { CheckRegisteredStreamerUseCase } from '../../usecases/CheckRegisteredStreamersUseCase'
import { ConnectChatUseCase } from '../../usecases/ConnectChatUseCase'
import { CreateBarUseCase } from '../../usecases/CreateBarUseCase'
import { DisconnectChatUseCase } from '../../usecases/DisconnectChatUseCase'
import { DrawCleavageUseCase } from '../../usecases/DrawCleavageUseCase'
import { DrawUseCase } from '../../usecases/DrawUseCase'
import { EraseUseCase } from '../../usecases/EraseUseCase'
import { InstallNewStoolsOnBarUseCase } from '../../usecases/InstallNewStoolsOnBarUseCase'
import { InstallNewStoolsOnTableUseCase } from '../../usecases/InstallNewStoolsOnTableUseCase'
import { InstallNewTableUseCase } from '../../usecases/InstallNewTableUseCase'
import { LaunchCleavageUseCase } from '../../usecases/LaunchCleavageUseCase'
import { NavigateUseCase } from '../../usecases/NavigateUseCase'
import { NewCleavageUseCase } from '../../usecases/NewCleavageUseCase'
import { PlayerApplauseUseCase } from '../../usecases/PlayerApplauseEvent'
import { PlayerCleaveUseCase } from '../../usecases/PlayerCleaveUseCase'
import { PlayerHyperLikeUseCase } from '../../usecases/PlayerHyperLikeUseCase'
import { PlayerJoinBarUseCase } from '../../usecases/PlayerJoinBarUseCase'
import { PlayerMessageUseCase } from '../../usecases/PlayerMessageUseCase'
import { PlayerMoveUseCase } from '../../usecases/PlayerMoveUseCase'
import { PlayerQuitUseCase } from '../../usecases/PlayerQuitUseCase'
import { PlayerShootUseCase } from '../../usecases/PlayerShootUseCase'
import { PlayerWhistleUseCase } from '../../usecases/PlayerWhistleUseCase'
import { RefreshCleavageDrawpileQuantityUseCase } from '../../usecases/RefreshCleavageDrawpileQuantityUseCase'
import { RefreshRegisteredStreamersUseCase } from '../../usecases/RefreshRegisteredStreamersUseCase'
import { RegisterStreamerUseCase } from '../../usecases/RegisterStreamerUseCase'
import { StartAutoplayUseCase } from '../../usecases/StartAutoplayUseCase'
import { StopAutoplayUseCase } from '../../usecases/StopAutoplayUseCase'
import { SuggestCleavageUseCase } from '../../usecases/SuggestCleavageUseCase'
import { TableStoolAvailableUseCase } from '../../usecases/TableStoolAvailableUseCase'
import type { UseCase } from '../../usecases/UseCase'
import { VideoExtractStartUseCase } from '../../usecases/VideoExtractStartUseCase'
import { VideoExtractStopUseCase } from '../../usecases/VideoExtractStopUseCase'
import type { ClientApplicationServices } from '../ApplicationServices'

export class PrimaryClientController {
    constructor (private applicationServices: ClientApplicationServices) {
        this.useCases.set(EventType.DISCONNECT_CHAT, new DisconnectChatUseCase(this.applicationServices))
        this.useCases.set(EventType.CONNECT_CHAT, new ConnectChatUseCase(this.applicationServices))
        this.useCases.set(EventType.NEW_CLEAVAGE, new NewCleavageUseCase(this.applicationServices))
        this.useCases.set(EventType.LAUNCH_CLEAVAGE, new LaunchCleavageUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_MESSAGE, new PlayerMessageUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_CLEAVE, new PlayerCleaveUseCase(this.applicationServices))
        this.useCases.set(EventType.DRAW_CLEAVAGE, new DrawCleavageUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_SUGGEST_CLEAVAGE, new SuggestCleavageUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_ASK_FOR_HELP, new AskForHelpUseCase(this.applicationServices))
        this.useCases.set(EventType.CANCEL_CLEAVAGE, new CancelCleavageUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_APPLAUSE, new PlayerApplauseUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_HYPERLIKE, new PlayerHyperLikeUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_WHISTLE, new PlayerWhistleUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_SHOOT, new PlayerShootUseCase(this.applicationServices))
        this.useCases.set(EventType.APPLICATION_START, new ApplicationStartUseCase(this.applicationServices))
        this.useCases.set(EventType.NAVIGATE, new NavigateUseCase(this.applicationServices))
        this.useCases.set(EventType.CHANGE_MUSIC_VOLUME, new ChangeMusicVolumeUseCase(this.applicationServices.interface))
        this.useCases.set(EventType.CHANGE_SOUND_VOLUME, new ChangeSoundVolumeUseCase(this.applicationServices.interface))
        this.useCases.set(EventType.PLAYER_QUIT, new PlayerQuitUseCase(this.applicationServices))
        this.useCases.set(EventType.START_AUTOPLAY, new StartAutoplayUseCase(this.applicationServices))
        this.useCases.set(EventType.CHECK_AUTOPLAY, new CheckAutoplayUseCase(this.applicationServices))
        this.useCases.set(EventType.STOP_AUTOPLAY, new StopAutoplayUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_JOIN_BAR, new PlayerJoinBarUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_MOVE, new PlayerMoveUseCase(this.applicationServices))
        this.useCases.set(EventType.INSTALL_NEW_TABLE, new InstallNewTableUseCase(this.applicationServices))
        this.useCases.set(EventType.INSTALL_NEW_STOOLS_ON_TABLE, new InstallNewStoolsOnTableUseCase(this.applicationServices))
        this.useCases.set(EventType.TABLE_STOOL_AVAILABLE, new TableStoolAvailableUseCase(this.applicationServices))
        this.useCases.set(EventType.CREATE_BAR, new CreateBarUseCase(this.applicationServices))
        this.useCases.set(EventType.INSTALL_NEW_STOOLS_ON_BAR, new InstallNewStoolsOnBarUseCase(this.applicationServices))
        this.useCases.set(EventType.DRAW, new DrawUseCase(this.applicationServices))
        this.useCases.set(EventType.CHANGE_GAME_PHASE, new ChangeGamePhaseUseCase(this.applicationServices))
        this.useCases.set(EventType.VIDEO_EXTRACT_START, new VideoExtractStartUseCase(this.applicationServices))
        this.useCases.set(EventType.VIDEO_EXTRACT_STOP, new VideoExtractStopUseCase(this.applicationServices))
        this.useCases.set(EventType.CHANGE_VIDEO_EXTRACT_VOLUME, new ChangeVideoExtractVolumeUseCase(this.applicationServices))
        this.useCases.set(EventType.ERASE, new EraseUseCase(this.applicationServices))
        this.useCases.set(EventType.REFRESH_CLEAVAGE_DRAWPILE_QUANTITY, new RefreshCleavageDrawpileQuantityUseCase(this.applicationServices))
        this.useCases.set(EventType.REGISTER_STREAMER, new RegisterStreamerUseCase(this.applicationServices))
        this.useCases.set(EventType.REFRESH_REGISTERED_STREAMERS, new RefreshRegisteredStreamersUseCase(this.applicationServices))
        this.useCases.set(EventType.CHECK_REGISTERED_STREAMER, new CheckRegisteredStreamerUseCase(this.applicationServices))
    }

    executeEvent (event: ApplicationEvent): Promise<void> {
        const usecase = this.useCases.get(event.eventType)
        return usecase
            ? usecase.execute(event)
            : Promise.reject(new Error(eventNotSupported(event, this)))
    }

    private useCases: Map<EventType, UseCase> = new Map([]);
}
