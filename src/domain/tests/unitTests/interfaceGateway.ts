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

export const theInterfaceGatewayHasNotifications = (gherkinPrefix: Gherkin, application: FakeClientApplication, expectedNotifications: ApplicationNotification[] | ApplicationNotification) => {
    const notifications = Array.isArray(expectedNotifications) ? expectedNotifications : [expectedNotifications]
    return it(`${gherkinPrefix} the notifications are sents : ${notifications.map(notification => JSON.stringify(notification)).join(',\n')}`, () => {
        expect(application.gateways.interface.notifications).deep.equal(notifications)
    })
}

export const theInterfaceGatewayHasCurrentView = (gherkinPrefix:Gherkin, application: FakeClientApplication, expectedInterfaceView: InterfaceView):Test =>
    it(`${gherkinPrefix} the interface gateway has the current view '${expectedInterfaceView}'.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.currentView = expectedInterfaceView
        expect(application.gateways.interface.currentView).equal(expectedInterfaceView)
    })

export const theInterfaceGatewayHasCurrentCleavage = (gherkinPrefix:Gherkin, application: FakeClientApplication, expectedCleavage: Cleavage):Test =>
    it(`${gherkinPrefix} the interface gateway has the current cleavage : '${stringifyWithDetailledSetAndMap(expectedCleavage)}'.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.currentCleavage = expectedCleavage
        expect(application.gateways.interface.currentCleavage).deep.equal(expectedCleavage, detailedComparisonMessage(application.gateways.interface.currentCleavage, expectedCleavage))
    })

export const theInterfaceGatewayDontHaveCleavage = (gherkinPrefix:Gherkin, application: FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway don't have cleavage.`, () => expect(application.gateways.interface.currentCleavage).equal(undefined))

export const theInterfaceGatewayHasPlayingSounds = (gherkinPrefix:Gherkin, application: FakeClientApplication, expectedPlayingSounds: Sound|Sound[]):Test => {
    const sounds : Sound[] = Array.isArray(expectedPlayingSounds) ? expectedPlayingSounds : [expectedPlayingSounds]
    return it(`${gherkinPrefix} the interface gateway is playing sounds : '${JSON.stringify(sounds)}'.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.playingSounds = sounds
        expect(application.gateways.interface.playingSounds).deep.equal(sounds)
    })
}

export const theInterfaceGatewayHasCurrentSoundVolume = (gherkinPrefix:Gherkin, application: FakeClientApplication, expectedSoundVolume: number):Test =>
    it(`${gherkinPrefix} the interface gateway has current music volume set to '${expectedSoundVolume}'.`, () => {
        if (isGiven(gherkinPrefix))application.gateways.interface.soundVolume = expectedSoundVolume
        expect(application.gateways.interface.soundVolume).deep.equal(expectedSoundVolume)
    })

export const theInterfaceGatewayHasCurrentMusicVolume = (gherkinPrefix:Gherkin, application: FakeClientApplication, expectedMusicVolume: number):Test =>
    it(`${gherkinPrefix} the interface gateway has current music volume set to '${expectedMusicVolume}'.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.musicVolume = expectedMusicVolume
        expect(application.gateways.interface.musicVolume).deep.equal(expectedMusicVolume)
    })

export const theInterfaceGatewayHasPlayingMusic = (gherkinPrefix:Gherkin, application: FakeClientApplication, expectedPlayingMusic: Music):Test =>
    it(`${gherkinPrefix} the interface gateway is playing music : '${JSON.stringify(expectedPlayingMusic)}'.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.playingMusic = expectedPlayingMusic
        expect(application.gateways.interface.playingMusic).deep.equal(expectedPlayingMusic)
    })

export const theInterfaceGatewayDontPlayMusic = (gherkinPrefix:Gherkin, application: FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway don't play music.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.playingMusic = undefined
        expect(application.gateways.interface.playingMusic).equal(undefined)
    })

export const theInterfaceGatewayHasAutoplayOptionDisabled = (gherkinPrefix:Gherkin, application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway has autoplay option disabled`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.autoplayEnabled = false
        expect(application.gateways.interface.autoplayEnabled).equal(false)
    })

export const theInterfaceGatewayHasAutoplayOptionEnabled = (gherkinPrefix:Gherkin, application:FakeClientApplication):Test =>
    it(`${gherkinPrefix} the interface gateway has autoplay option enabled`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.interface.autoplayEnabled = true
        expect(application.gateways.interface.autoplayEnabled).equal(true)
    })
