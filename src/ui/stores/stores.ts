import { writable } from 'svelte/store'
import type { ApplicationEvent } from '../../domain/events/GameEvent'
import type { Cleavage } from '../../domain/entities/Cleavage'
import { InterfaceView } from '../../domain/entities/InterfaceView'
import { defaultMusicVolumeLevel, defaultSoundVolumeLevel, defaultVideoExtractVolumeLevel } from '../../infra/gateways/interface/defaultVolumeLevels'
import { GamePhase } from '../../domain/entities/GamePhase'
import type { VideoExtract } from '../../domain/entities/VideoExtract'
import type { StreamerDto } from '../../domain/entities/StreamerDto'
export const applicationEventStore = writable<ApplicationEvent|undefined>(undefined)
export const currentCleavageStore = writable<Cleavage|undefined>(undefined)
export const interfaceViewStore = writable(InterfaceView.NONE)
export const musicVolumeStore = writable(defaultMusicVolumeLevel)
export const soundVolumeStore = writable(defaultSoundVolumeLevel)
export const autoplayStore = writable<boolean>(false)
export const gamePhaseStore = writable<GamePhase>(GamePhase.NONE)
export const videoExtractStore = writable<VideoExtract|undefined>(undefined)
export const videoExtractVolumeStore = writable(defaultVideoExtractVolumeLevel)
export const cleavageDrawPileQuantityStore = writable<number>(0)
export const listOfRegisteredStreamersStore = writable<StreamerDto[]>([])
export const isStreamerRegisteredStore = writable<boolean|undefined>(undefined)
export const isHelpEnabledStore = writable<string|undefined>(undefined)
