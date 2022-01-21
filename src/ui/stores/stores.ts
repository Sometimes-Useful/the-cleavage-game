import { writable } from 'svelte/store'
import type { ApplicationEvent } from '../../domain/events/GameEvent'
import type { Cleavage } from '../../domain/entities/Cleavage'
import { InterfaceView } from '../../domain/entities/InterfaceView'
import { defaultMusicVolumeLevel, defaultSoundVolumeLevel } from '../../infra/gateways/interface/defaultVolumeLevels'
export const applicationEventStore = writable<ApplicationEvent|undefined>(undefined)
export const cleavageStore = writable<Cleavage|undefined>(undefined)
export const interfaceViewStore = writable(InterfaceView.NONE)
export const musicVolumeStore = writable(defaultMusicVolumeLevel)
export const soundVolumeStore = writable(defaultSoundVolumeLevel)
