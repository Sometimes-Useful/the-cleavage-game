import type { InterfaceGateway } from '../../../domain/ports/InterfaceGateway'
import { SupportedSound } from '../../../domain/ports/SoundType'
import type { Cleavage } from '../../../domain/entities/Cleavage'
import { InterfaceView } from '../../../domain/entities/InterfaceView'
import type { ApplicationNotification } from '../../../domain/entities/notification/Notification'
import type { Sound } from '../../../domain/entities/sound'
import { SupportedMusic } from '../../../domain/entities/music/SupportedMusic'
import type { Music } from '../../../domain/entities/music/Music'
import { cleavageStore, interfaceViewStore } from '../../../ui/stores/stores'
import * as Tone from 'tone'

export class SvelteAndToneInterfaceGateway implements InterfaceGateway {
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
        const player = new Tone.Player(musicToPlay).toDestination()
        player.loop = true
        player.volume.value = music.volume
        player.start(0)
        return Promise.resolve()
    }

    private onSoundReadyToPlay (supportedSound:SupportedSound, soundToPlay: Tone.ToneAudioBuffer): Promise<void> {
        console.log('PLAYING_SOUND', supportedSound)
        const player = new Tone.Player(soundToPlay).toDestination()
        player.start()
        return Promise.resolve()
    }

    private currentView: InterfaceView = InterfaceView.NONE
    private toneReady: boolean = false

    private supportedSounds :Map<SupportedSound, Tone.ToneAudioBuffer> = new Map([
        [SupportedSound.QUACK, new Tone.ToneAudioBuffer('/sounds/quack.mp3')],
        [SupportedSound.DICE_ROLL, new Tone.ToneAudioBuffer('/sounds/dice_roll.mp3')],
        [SupportedSound.ERROR, new Tone.ToneAudioBuffer('/sounds/error.mp3')],
        [SupportedSound.HYPERLIKE, new Tone.ToneAudioBuffer('/sounds/hyperlike.mp3')],
        [SupportedSound.SHOOT, new Tone.ToneAudioBuffer('/sounds/shoot.mp3')],
        [SupportedSound.WHISTLE, new Tone.ToneAudioBuffer('/sounds/whistle.mp3')],
        [SupportedSound.POUFFF, new Tone.ToneAudioBuffer('/sounds/poufff.mp3')],
        [SupportedSound.APPLAUSE, new Tone.ToneAudioBuffer('/sounds/applause.mp3')]
    ])

    private supportedMusics: Map<SupportedMusic, Tone.ToneAudioBuffer> = new Map([
        [SupportedMusic.MAIN, new Tone.ToneAudioBuffer('/music/Ken Hamm - Buckbreak.mp3')]
    ])
}

const toneIsNotReady = 'Tone is not ready'
const soundBufferIsNotLoaded = (sound: Sound): string => `Tone sound buffer ${sound.type} is not loaded.`
const musicBufferIsNotLoaded = (music: Music): string => `Tone music buffer ${music.supportedMusic} is not loaded.`
const missingSoundOnSoundAssets = (sound: Sound): string => `Missing sound ${sound.type} on sound assets.`
const missingMusicOnMusicAssets = (music: Music): string => `Missing music ${music.supportedMusic} on sound assets.`
