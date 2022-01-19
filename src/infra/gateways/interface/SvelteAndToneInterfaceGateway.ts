import type { Cleavage } from '../../../domain/entities/Cleavage'
import { InterfaceView } from '../../../domain/entities/InterfaceView'
import type { ApplicationNotification } from '../../../domain/entities/notification/Notification'
import type { Sound } from '../../../domain/entities/sound'
import type { InterfaceGateway } from '../../../domain/ports/InterfaceGateway'
import { cleavageStore, interfaceViewStore } from '../../../ui/stores/stores'
import * as Tone from 'tone'
import { SoundType } from '../../../domain/ports/SoundType'
import type { Music } from '../../../domain/entities/music/Music'
import { SupportedMusic } from '../../../domain/entities/music/SupportedMusic'

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
        if (this.toneReady) {
            const musicToPlay = this.supportedMusics.get(music.supportedMusic)
            if (musicToPlay && musicToPlay.loaded) {
                const player = new Tone.Player(musicToPlay).toDestination()
                player.loop = true
                player.volume.value = music.volume
                player.start(0)
            }
            console.log(`Missing sound ${music.supportedMusic} on music assets.`)
        } else {
            console.log('Tone not ready')
        }
        return Promise.resolve()
    }

    playSound (sound: Sound): Promise<void> {
        console.log('PLAY_SOUND', sound.type)
        if (this.toneReady) {
            const soundToPlay = this.sounds.get(sound.type)
            return !soundToPlay
                ? Promise.reject(new Error(`Missing sound ${sound.type} on sound assets.`))
                : soundToPlay.loaded
                    ? this.onSound(sound.type, soundToPlay)
                    : Promise.reject(new Error(`Tone sound ${sound.type} not loaded.`))
        }
        return Promise.reject(new Error('Tone not ready'))
    }

    private onSound (soundType:SoundType, soundToPlay: Tone.ToneAudioBuffer): Promise<void> {
        console.log('PLAYING_SOUND', soundType)
        const player = new Tone.Player(soundToPlay).toDestination()
        player.start()
        return Promise.resolve()
    }

    retrieveCurrentView (): Promise<InterfaceView> {
        return Promise.resolve(this.currentView)
    }

    notify (notification: ApplicationNotification): Promise<void> {
        console.log('NOTIFY', notification.message)
        return Promise.resolve()
    }

    updateCleavage (cleavage: Cleavage|undefined): Promise<void> {
        console.log('UPDATE_CLEAVAGE', cleavage)
        cleavageStore.set(cleavage)
        return Promise.resolve()
    }

    changeView (interfaceView: InterfaceView): Promise<void> {
        console.log('CHANGE_VIEW', interfaceView)
        this.currentView = interfaceView
        interfaceViewStore.set(interfaceView)
        return Promise.resolve()
    }

    private currentView: InterfaceView = InterfaceView.NONE
    private sounds :Map<SoundType, Tone.ToneAudioBuffer> = new Map([
        [SoundType.QUACK, new Tone.ToneAudioBuffer('/sounds/quack.mp3')],
        [SoundType.DICE_ROLL, new Tone.ToneAudioBuffer('/sounds/dice_roll.mp3')],
        [SoundType.ERROR, new Tone.ToneAudioBuffer('/sounds/error.mp3')],
        [SoundType.HYPERLIKE, new Tone.ToneAudioBuffer('/sounds/hyperlike.mp3')],
        [SoundType.SHOOT, new Tone.ToneAudioBuffer('/sounds/shoot.mp3')],
        [SoundType.WHISTLE, new Tone.ToneAudioBuffer('/sounds/whistle.mp3')],
        [SoundType.POUFFF, new Tone.ToneAudioBuffer('/sounds/poufff.mp3')],
        [SoundType.APPLAUSE, new Tone.ToneAudioBuffer('/sounds/applause.mp3')]
    ])

    private supportedMusics: Map<SupportedMusic, Tone.ToneAudioBuffer> = new Map([
        [SupportedMusic.MAIN, new Tone.ToneAudioBuffer('/music/Ken Hamm - Buckbreak.mp3')]
    ])

    private toneReady: boolean = false
}
