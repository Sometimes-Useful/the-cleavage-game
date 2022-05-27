import { expect } from 'chai'
import { it, Test } from 'mocha'
import type { ApplicationNotification } from '../../entities/notification/Notification'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { InterfaceView } from '../../entities/InterfaceView'
import type { Cleavage } from '../../entities/Cleavage'
import type { Music } from '../../entities/music/Music'
import type { Sound } from '../../entities/sound'
import { detailedComparisonMessage, isGiven, stringifyWithDetailledSetAndMap } from './unitTests'
import type { Gherkin } from '../Gherkin'
import type { GamePhase } from '../../entities/GamePhase'
import type { InterfaceEntityState } from '../../entities/InterfaceEntityState'
import type { VideoExtract } from '../../entities/VideoExtract'
import type { StreamerDto } from '../../entities/StreamerDto'
import { uniqueOrArrayToArray } from '../../../generic/array'

export const theInterfaceGatewayHasNotifications = (gherkinPrefix: Gherkin, expectedNotifications: ApplicationNotification[] | ApplicationNotification) => (application:FakeClientApplication):Test => {
    const notifications = uniqueOrArrayToArray(expectedNotifications)
    return it(`${gherkinPrefix} the notifications are sents : ${notifications.map(notification => JSON.stringify(notification)).join(',\n')}`, () => {
        expect(application.gateways.interface.notifications).deep.equal(notifications)
    })
}

export const theInterfaceGatewayHasCurrentView = (gherkinPrefix:Gherkin, expectedInterfaceView: InterfaceView) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway has the current view '${expectedInterfaceView}'.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.currentView = expectedInterfaceView
        expect(application.gateways.interface.currentView).equal(expectedInterfaceView)
    })

export const theInterfaceGatewayHasCurrentCleavage = (gherkinPrefix:Gherkin, expectedCleavage: Cleavage) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway has the current cleavage : '${stringifyWithDetailledSetAndMap(expectedCleavage)}'.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.currentCleavage = expectedCleavage
        expect(application.gateways.interface.currentCleavage).deep.equal(expectedCleavage, detailedComparisonMessage(application.gateways.interface.currentCleavage, expectedCleavage))
    })

export const theInterfaceGatewayDontHaveCleavage = (gherkinPrefix:Gherkin) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway don't have cleavage.`, () => expect(application.gateways.interface.currentCleavage).equal(undefined))

export const theInterfaceGatewayHasPlayingSounds = (gherkinPrefix:Gherkin, expectedPlayingSounds: Sound|Sound[]) => (application:FakeClientApplication):Test => {
    const sounds = uniqueOrArrayToArray(expectedPlayingSounds)
    return it(`${gherkinPrefix} the interface gateway is playing sounds : '${JSON.stringify(sounds)}'.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.playingSounds = sounds
        expect(application.gateways.interface.playingSounds).deep.equal(sounds)
    })
}

export const theInterfaceGatewayHasCurrentSoundVolume = (gherkinPrefix:Gherkin, expectedSoundVolume: number) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway has current music volume set to '${expectedSoundVolume}'.`, () => {
        if (isGiven(gherkinPrefix))application.gateways.interface.soundVolume = expectedSoundVolume
        expect(application.gateways.interface.soundVolume).deep.equal(expectedSoundVolume)
    })

export const theInterfaceGatewayHasCurrentMusicVolume = (gherkinPrefix:Gherkin, expectedMusicVolume: number) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway has current music volume set to '${expectedMusicVolume}'.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.musicVolume = expectedMusicVolume
        expect(application.gateways.interface.musicVolume).deep.equal(expectedMusicVolume)
    })

export const theInterfaceGatewayHasPlayingMusic = (gherkinPrefix:Gherkin, expectedPlayingMusic: Music) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway is playing music : '${JSON.stringify(expectedPlayingMusic)}'.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.playingMusic = expectedPlayingMusic
        expect(application.gateways.interface.playingMusic).deep.equal(expectedPlayingMusic)
    })

export const theInterfaceGatewayDontPlayMusic = (gherkinPrefix:Gherkin) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway don't play music.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.playingMusic = undefined
        expect(application.gateways.interface.playingMusic).equal(undefined)
    })

export const theInterfaceGatewayHasAutoplayOptionDisabled = (gherkinPrefix:Gherkin) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway has autoplay option disabled`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.autoplayEnabled = false
        expect(application.gateways.interface.autoplayEnabled).equal(false)
    })

export const theInterfaceGatewayHasAutoplayOptionEnabled = (gherkinPrefix:Gherkin) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway has autoplay option enabled`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.autoplayEnabled = true
        expect(application.gateways.interface.autoplayEnabled).equal(true)
    })

export const theInterfaceGatewayHasEntityInterfaceState = (gherkinPrefix:Gherkin, interfaceEntitiesState:Map<string, InterfaceEntityState>) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway has entity interface state`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.interfaceEntitiesState = interfaceEntitiesState
        expect(application.gateways.interface.interfaceEntitiesState).deep.equal(interfaceEntitiesState, detailedComparisonMessage(application.gateways.interface.interfaceEntitiesState, interfaceEntitiesState))
    })

export const theInterfaceGatewayHasCurrentGamePhase = (gherkinPrefix:Gherkin, gamePhase:GamePhase) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway has game phase ${gamePhase}`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.gamePhase = gamePhase
        expect(application.gateways.interface.gamePhase).deep.equal(gamePhase)
    })

export const theInterfaceGatewayHasCurrentVideo = (gherkinPrefix:Gherkin, videoExtract:VideoExtract) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway has current video extract with choice ${videoExtract.choice} and percentage ${videoExtract.percentage}`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.videoExtract = videoExtract
        expect(application.gateways.interface.videoExtract).deep.equal(videoExtract)
    })
export const theInterfaceGatewayHasNoCurrentVideo = (gherkinPrefix:Gherkin) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway has no current video extract`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.videoExtract = undefined
        expect(application.gateways.interface.videoExtract).deep.equal(undefined)
    })

export const theInterfaceGatewayHasCurrentMusicMuted = (gherkinPrefix:Gherkin) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway has current music muted.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.musicMuted = true
        expect(application.gateways.interface.musicMuted).deep.equal(true)
    })
export const theInterfaceGatewayHasCurrentMusicNotMuted = (gherkinPrefix:Gherkin) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway has current music not muted.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.musicMuted = false
        expect(application.gateways.interface.musicMuted).deep.equal(false)
    })

export const theInterfaceGatewayHasCurrentVideoExtractVolume = (gherkinPrefix:Gherkin, expectedVolume:number) => (application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway has current video extract volume set to ${expectedVolume}`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.videoExtractVolume = expectedVolume
        expect(application.gateways.interface.videoExtractVolume).deep.equal(expectedVolume)
    })

export const theInterfaceGatewayDontHaveCleavageDrawpileQuantity = (gherkinPrefix: Gherkin) => (application:FakeClientApplication): Test =>
    it(`${gherkinPrefix} the interface gateway don't have cleavage drawpile quantity.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.cleavageDrawpileQuantity = 0
        expect(application.gateways.interface.cleavageDrawpileQuantity).equal(0)
    })

export const theInterfaceGatewayHasCleavageDrawpileQuantity = (gherkinPrefix: Gherkin, expectedCleavageQuantity: number) => (application: FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway don't have cleavage drawpile quantity.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.cleavageDrawpileQuantity = expectedCleavageQuantity
        expect(application.gateways.interface.cleavageDrawpileQuantity).equal(expectedCleavageQuantity)
    })

export const theInterfaceGatewayHasRegisteredStreamers = (gherkinPrefix: Gherkin, expectedRegisteredStreamer: StreamerDto|StreamerDto[]) => (application: FakeClientApplication): Test => {
    const expectedRegisteredStreamers = uniqueOrArrayToArray(expectedRegisteredStreamer)
    return it(`${gherkinPrefix} the interface gateway has registered streamers.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.registeredStreamers = expectedRegisteredStreamers
        expect(application.gateways.interface.registeredStreamers).deep.equal(expectedRegisteredStreamers)
    })
}

export const theInterfaceGatewayDontHaveRegisteredStreamers = (gherkinPrefix: Gherkin) => (application: FakeClientApplication): Test =>
    it(`${gherkinPrefix} the interface gateway don't have registered streamers.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.registeredStreamers = []
        expect(application.gateways.interface.registeredStreamers).deep.equal([])
    })

export const theInterfaceGatewayHasStreamerRegistered = (gherkinPrefix: Gherkin) => (application: FakeClientApplication): Test =>
    it(`${gherkinPrefix} the interface gateway has the streamer registered.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.isStreamerRegistered = true
        expect(application.gateways.interface.isStreamerRegistered).deep.equal(true)
    })

export const theInterfaceGatewayDontHaveStreamerRegistered = (gherkinPrefix: Gherkin) => (application: FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway don't have the streamer registered.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.isStreamerRegistered = false
        expect(application.gateways.interface.isStreamerRegistered).deep.equal(false)
    })
