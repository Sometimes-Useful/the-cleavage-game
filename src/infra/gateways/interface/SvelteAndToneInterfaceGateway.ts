import type { InterfaceGateway } from '../../../domain/ports/InterfaceGateway'
import type { SupportedSound } from '../../../domain/ports/SoundType'
import type { Cleavage } from '../../../domain/entities/Cleavage'
import type { ApplicationNotification } from '../../../domain/entities/notification/Notification'
import type { Sound } from '../../../domain/entities/sound'
import type { Music } from '../../../domain/entities/music/Music'
import type { SupportedMusic } from '../../../domain/entities/music/SupportedMusic'
import { InterfaceView } from '../../../domain/entities/InterfaceView'
import { defaultMusicVolumeLevel, defaultSoundVolumeLevel } from './defaultVolumeLevels'
import { cleavageStore, interfaceViewStore, musicVolumeStore, soundVolumeStore } from '../../../ui/stores/stores'
import * as Tone from 'tone'

export class SvelteAndToneInterfaceGateway implements InterfaceGateway {
    constructor (
        private supportedSounds :Map<SupportedSound, Tone.ToneAudioBuffer>,
        private supportedMusics: Map<SupportedMusic, Tone.ToneAudioBuffer>
    ) {}

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
        cleavageStore.set(cleavage)
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

    private musicVolumeFader: Tone.Volume = new Tone.Volume(Tone.gainToDb(defaultMusicVolumeLevel / 100)).toDestination()
    private soundVolumeFader: Tone.Volume = new Tone.Volume(Tone.gainToDb(defaultSoundVolumeLevel / 100)).toDestination()
    private currentView: InterfaceView = InterfaceView.NONE
    private toneReady: boolean = false
}

const toneIsNotReady = 'Tone is not ready'
const soundBufferIsNotLoaded = (sound: Sound): string => `Tone sound buffer ${sound.type} is not loaded.`
const musicBufferIsNotLoaded = (music: Music): string => `Tone music buffer ${music.supportedMusic} is not loaded.`
const missingSoundOnSoundAssets = (sound: Sound): string => `Missing sound ${sound.type} on sound assets.`
const missingMusicOnMusicAssets = (music: Music): string => `Missing music ${music.supportedMusic} on sound assets.`
