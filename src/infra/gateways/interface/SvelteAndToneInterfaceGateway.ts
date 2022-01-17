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
        /*
        return Promise.all([
            new Tone.Player().load('/sounds/quack.mp3'),
            new Tone.Player().load('/sounds/dice_roll.mp3'),
            new Tone.Player().load('/sounds/error.mp3'),
            new Tone.Player().load('/sounds/hyperlike.mp3'),
            new Tone.Player().load('/sounds/shoot.mp3'),
            new Tone.Player().load('/sounds/whistle.mp3'),
            new Tone.Player().load('/sounds/poufff.mp3'),
            new Tone.Player().load('/sounds/applause.mp3')
        ])
            .then(tones => {
                this.sounds.set(SoundType.QUACK, tones[0])
                this.sounds.set(SoundType.DICE_ROLL, tones[1])
                this.sounds.set(SoundType.ERROR, tones[2])
                this.sounds.set(SoundType.HYPERLIKE, tones[3])
                this.sounds.set(SoundType.SHOOT, tones[4])
                this.sounds.set(SoundType.WHISTLE, tones[5])
                this.sounds.set(SoundType.POUFFF, tones[6])
                this.sounds.set(SoundType.APPLAUSE, tones[7])
                */
        return Tone.loaded()
            // })
            .then(() => {
                console.log('Tone ready.')
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
                musicToPlay.loop = true
                musicToPlay.volume.value = music.volume
                musicToPlay.start(0)
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

    private onSound (soundType:SoundType, soundToPlay: Tone.Player): Promise<void> {
        console.log('PLAYING_SOUND', soundType)
        soundToPlay.start()
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
    private sounds :Map<SoundType, Tone.Player> = new Map([
        [SoundType.QUACK, new Tone.Player('/sounds/quack.mp3').toDestination()],
        [SoundType.DICE_ROLL, new Tone.Player('/sounds/dice_roll.mp3').toDestination()],
        [SoundType.ERROR, new Tone.Player('/sounds/error.mp3').toDestination()],
        [SoundType.HYPERLIKE, new Tone.Player('/sounds/hyperlike.mp3').toDestination()],
        [SoundType.SHOOT, new Tone.Player('/sounds/shoot.mp3').toDestination()],
        [SoundType.WHISTLE, new Tone.Player('/sounds/whistle.mp3').toDestination()],
        [SoundType.POUFFF, new Tone.Player('/sounds/poufff.mp3').toDestination()],
        [SoundType.APPLAUSE, new Tone.Player('/sounds/applause.mp3').toDestination()]
    ])

    private supportedMusics: Map<SupportedMusic, Tone.Player> = new Map([
        [SupportedMusic.MAIN, new Tone.Player('/music/Ken Hamm - Buckbreak.mp3').toDestination()]
    ])

    private toneReady: boolean = false
}
