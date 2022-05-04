import { Application, Sprite } from 'pixi.js'
import * as Tone from 'tone'
import type { Cleavage } from '../../../domain/entities/Cleavage'
import type { GamePhase } from '../../../domain/entities/GamePhase'
import type { InterfaceEntityState } from '../../../domain/entities/InterfaceEntityState'
import { InterfaceView } from '../../../domain/entities/InterfaceView'
import type { Music } from '../../../domain/entities/music/Music'
import type { SupportedMusic } from '../../../domain/entities/music/SupportedMusic'
import type { ApplicationNotification } from '../../../domain/entities/notification/Notification'
import type { Size } from '../../../domain/entities/Size'
import type { Sound } from '../../../domain/entities/sound'
import type { SupportedSound } from '../../../domain/entities/SoundType'
import { SpriteType } from '../../../domain/entities/SpriteType'
import type { StreamerDto } from '../../../domain/entities/StreamerDto'
import type { VideoExtract } from '../../../domain/entities/VideoExtract'
import type { InterfaceGateway } from '../../../domain/ports/secondary/gateways/InterfaceGateway'
import { autoplayStore, cleavageDrawPileQuantityStore, currentCleavageStore, gamePhaseStore, interfaceViewStore, musicVolumeStore, listOfRegisteredStreamersStore, soundVolumeStore, videoExtractStore, videoExtractVolumeStore, isStreamerRegisteredStore } from '../../../ui/stores/stores'
import { defaultMusicVolumeLevel, defaultSoundVolumeLevel } from './defaultVolumeLevels'
import { PixiApplicationCommon } from './PixiApplicationCommon'

interface PixiJsEntity extends InterfaceEntityState {
    pixiSprite:Sprite
}
const entityIdMissingOnPixiEntities = (entityId:string) => `Entity id '${entityId} missing on pixiEntities'`
const missingSpriteType = (spriteType: SpriteType) => `Missing texture for sprite type '${spriteType}''`

export class SvelteTonePixiInterfaceGateway extends PixiApplicationCommon implements InterfaceGateway {
    constructor (
        private supportedSounds :Map<SupportedSound, Tone.ToneAudioBuffer>,
        private supportedMusics: Map<SupportedMusic, Tone.ToneAudioBuffer>,
        private pixiApplication: Application,
        private textureSources: Map<SpriteType, string>
    ) { super() }

    updateStreamerRegistered (isRegistered: boolean): Promise<void> {
        isStreamerRegisteredStore.set(isRegistered)
        return Promise.resolve()
    }

    updateListOfRegisteredStreamers (streamers: StreamerDto[]): Promise<void> {
        listOfRegisteredStreamersStore.set(streamers)
        return Promise.resolve()
    }

    updateCleavageDrawpileQuantity (cleavageDrawpileQuantity: number): Promise<void> {
        cleavageDrawPileQuantityStore.set(cleavageDrawpileQuantity)
        return Promise.resolve()
    }

    changeVideoExtractVolumeLevel (volume: number): Promise<void> {
        videoExtractVolumeStore.set(volume)
        return Promise.resolve()
    }

    unMuteMusic (): Promise<void> {
        const onMusicVolumeBeforeMute = (musicVolumeBeforeMute:number) => {
            this.musicVolumeFader.volume.value = musicVolumeBeforeMute
            this.musicVolumeBeforeMute = undefined
            return Promise.resolve()
        }
        console.log('UNMUTE', this.musicVolumeBeforeMute)
        return this.musicVolumeBeforeMute === undefined
            ? Promise.reject(new Error('musicVolumeBeforeMute is undefined.'))
            : onMusicVolumeBeforeMute(this.musicVolumeBeforeMute)
    }

    muteMusic (): Promise<void> {
        this.musicVolumeBeforeMute = this.musicVolumeFader.volume.value
        console.log('MUTE', this.musicVolumeBeforeMute)
        this.musicVolumeFader.volume.value = Tone.gainToDb(0 / 100)
        return Promise.resolve()
    }

    public changeVideoExtract (videoExtract: VideoExtract): Promise<void> {
        videoExtractStore.set(videoExtract)
        return Promise.resolve()
    }

    public addingViewToDom (htmlElement:HTMLElement):Promise<void> {
        htmlElement.appendChild(this.pixiApplication.view)
        return Promise.resolve()
    }

    public changeResolution (resolution: Size): Promise<void> {
        return this.resizePixiAppRenderer(this.conserveAspectRatio(resolution))
            .then(() => this.updateInterfaceStates())
            .catch(error => Promise.reject(error))
    }

    private resizePixiAppRenderer (resolution:Size):Promise<void> {
        this.pixiApplication.renderer.resize(resolution.width, resolution.height)
        return Promise.resolve()
    }

    private updateInterfaceStates () {
        return Promise.all([...this.pixiEntities.values()].map(pixiEntity => this.updatePixiEntityGraphically(pixiEntity)))
            .then(() => this.pixiApplication.stage.sortChildren())
            .catch(error => Promise.reject(error))
    }

    private updatePixiEntityGraphically (pixiEntity: PixiJsEntity):Promise<void> {
        return Promise.all([
            this.updatePixiEntityAbsolutePosition(pixiEntity),
            this.updatePixiEntitySize(pixiEntity)
        ])
            .then(() => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    private updatePixiEntitySize (pixiEntity: PixiJsEntity) {
        const resolution = this.retrieveResolution()
        pixiEntity.pixiSprite.width = resolution.width / this.drawingZone.width * pixiEntity.size.width
        pixiEntity.pixiSprite.height = resolution.height / this.drawingZone.height * pixiEntity.size.height
    }

    public retrieveResolution (): Size {
        return { width: this.pixiApplication.renderer.view.width, height: this.pixiApplication.renderer.view.height }
    }

    private updatePixiEntityAbsolutePosition (pixiEntity:PixiJsEntity) :Promise<void> {
        const absolutePosition = this.relativePositionToAbsolutePosition(pixiEntity.position, this.retrieveResolution())
        pixiEntity.pixiSprite.x = absolutePosition.x
        pixiEntity.pixiSprite.y = absolutePosition.y
        pixiEntity.pixiSprite.zIndex = pixiEntity.spriteType === SpriteType.PLAYER ? 1 : 0
        if (pixiEntity.spriteType === SpriteType.PLAYER) console.log(pixiEntity.position)
        return Promise.resolve()
    }

    private conserveAspectRatio (resolution: Size) {
        const diffRatio = resolution.width / this.drawingZone.width - resolution.height / this.drawingZone.height
        if (diffRatio > 0) resolution.width = ((resolution.width / this.drawingZone.width) - Math.abs(diffRatio)) * this.drawingZone.width
        if (diffRatio < 0) resolution.height = ((resolution.height / this.drawingZone.height) - Math.abs(diffRatio)) * this.drawingZone.height
        return resolution
    }

    changeGamePhase (gamePhase: GamePhase): Promise<void> {
        gamePhaseStore.set(gamePhase)
        return Promise.resolve()
    }

    removeEntityInterfaceState (id: string): Promise<void> {
        const pixiEntity = this.pixiEntities.get(id)
        if (pixiEntity) {
            pixiEntity.pixiSprite.destroy(false)
            this.pixiEntities.delete(id)
        }
        return Promise.resolve()
    }

    updateEntityInterfaceState (id: string, interfaceEntityState: InterfaceEntityState): Promise<void> {
        const pixiEntity = this.pixiEntities.get(id)
        return (
            pixiEntity
                ? this.updatePixiEntity(pixiEntity, interfaceEntityState)
                : this.createPixiEntity(id, interfaceEntityState)
        )
            .then(() => this.pixiApplication.stage.sortChildren())
            .catch(error => Promise.reject(error))
    }

    private createPixiEntity (entityId:string, interfaceEntityState: InterfaceEntityState):Promise<void> {
        const textureSourceUrl = this.textureSources.get(interfaceEntityState.spriteType)
        if (!textureSourceUrl) return Promise.reject(new Error(missingSpriteType(interfaceEntityState.spriteType)))
        const sprite = this.pixiApplication.stage.addChild(Sprite.from(textureSourceUrl))
        this.pixiEntities.set(entityId, {
            position: interfaceEntityState.position,
            size: interfaceEntityState.size,
            spriteType: interfaceEntityState.spriteType,
            pixiSprite: sprite
        })
        const pixiEntity = this.pixiEntities.get(entityId)
        return pixiEntity
            ? this.updatePixiEntityGraphically(pixiEntity)
            : Promise.reject(new Error(entityIdMissingOnPixiEntities(entityId)))
    }

    private updatePixiEntity (pixiEntity: PixiJsEntity, interfaceEntityState:InterfaceEntityState): Promise<void> {
        pixiEntity.position = interfaceEntityState.position
        pixiEntity.spriteType = interfaceEntityState.spriteType
        return this.updatePixiEntityGraphically(pixiEntity)
    }

    disableAutoplay (): Promise<void> {
        autoplayStore.set(false)
        return Promise.resolve()
    }

    enableAutoplay (): Promise<void> {
        autoplayStore.set(true)
        return Promise.resolve()
    }

    changeMusicVolumeLevel (volume: number): Promise<void> {
        this.musicVolumeFader.volume.value = Tone.gainToDb(volume / 100)
        musicVolumeStore.set(volume)
        return Promise.resolve()
    }

    changeSoundVolumeLevel (volume: number): Promise<void> {
        this.soundVolumeFader.volume.value = Tone.gainToDb(volume / 100)
        soundVolumeStore.set(volume)
        return Promise.resolve()
    }

    public load ():Promise<void> {
        console.log('Tone loading...')
        return Tone.loaded()
            .then(() => {
                console.log('Tone loaded.')
                this.toneReady = true
                console.log('Tone starting...')
                return Tone.start()
            })
            .then(() => {
                console.log('Tone started.')
                return Promise.resolve()
            })
            .catch(error => Promise.reject(error))
    }

    playMusic (music: Music): Promise<void> {
        console.log('PLAY_MUSIC', music.supportedMusic)
        const musicBufferToPlay = this.supportedMusics.get(music.supportedMusic)
        return !this.toneReady
            ? Promise.reject(new Error(toneIsNotReady))
            : !musicBufferToPlay
                ? Promise.reject(new Error(missingMusicOnMusicAssets(music)))
                : musicBufferToPlay.loaded
                    ? this.onMusicReadyToPlay(music, musicBufferToPlay)
                    : Promise.reject(new Error(musicBufferIsNotLoaded(music)))
    }

    playSound (sound: Sound): Promise<void> {
        console.log('PLAY_SOUND', sound.type)
        const soundBufferToPlay = this.supportedSounds.get(sound.type)
        return !this.toneReady
            ? Promise.reject(new Error(toneIsNotReady))
            : !soundBufferToPlay
                ? Promise.reject(new Error(missingSoundOnSoundAssets(sound)))
                : soundBufferToPlay.loaded
                    ? this.onSoundReadyToPlay(sound.type, soundBufferToPlay)
                    : Promise.reject(new Error(soundBufferIsNotLoaded(sound)))
    }

    public retrieveCurrentView (): Promise<InterfaceView> {
        return Promise.resolve(this.currentView)
    }

    public notify (notification: ApplicationNotification): Promise<void> {
        console.log('NOTIFY', notification.message)
        return Promise.resolve()
    }

    public updateCleavage (cleavage: Cleavage|undefined): Promise<void> {
        console.log('UPDATE_CLEAVAGE', cleavage)
        currentCleavageStore.set(cleavage)
        return Promise.resolve()
    }

    public changeView (interfaceView: InterfaceView): Promise<void> {
        console.log('CHANGE_VIEW', interfaceView)
        this.currentView = interfaceView
        interfaceViewStore.set(interfaceView)
        return Promise.resolve()
    }

    private onMusicReadyToPlay (music: Music, musicToPlay: Tone.ToneAudioBuffer):Promise<void> {
        console.log('PLAYING_MUSIC', music.supportedMusic)
        const player = new Tone.Player(musicToPlay).connect(this.musicVolumeFader)
        player.loop = true
        player.start()
        return Promise.resolve()
    }

    private onSoundReadyToPlay (supportedSound:SupportedSound, soundToPlay: Tone.ToneAudioBuffer): Promise<void> {
        console.log('PLAYING_SOUND', supportedSound)
        const player = new Tone.Player(soundToPlay).connect(this.soundVolumeFader)
        player.start()
        return Promise.resolve()
    }

    pixiEntities: Map<string, PixiJsEntity> = new Map()
    private musicVolumeFader: Tone.Volume = new Tone.Volume(Tone.gainToDb(defaultMusicVolumeLevel / 100)).toDestination()
    private soundVolumeFader: Tone.Volume = new Tone.Volume(Tone.gainToDb(defaultSoundVolumeLevel / 100)).toDestination()
    private currentView: InterfaceView = InterfaceView.NONE
    private toneReady: boolean = false
    private musicVolumeBeforeMute: number | undefined
}

const toneIsNotReady = 'Tone is not ready'
const soundBufferIsNotLoaded = (sound: Sound): string => `Tone sound buffer ${sound.type} is not loaded.`
const musicBufferIsNotLoaded = (music: Music): string => `Tone music buffer ${music.supportedMusic} is not loaded.`
const missingSoundOnSoundAssets = (sound: Sound): string => `Missing sound ${sound.type} on sound assets.`
const missingMusicOnMusicAssets = (music: Music): string => `Missing music ${music.supportedMusic} on sound assets.`
