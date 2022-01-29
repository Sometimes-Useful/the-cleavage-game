import { expect } from 'chai'
import { it, Test } from 'mocha'
import { Gherkin } from '../Gherkin'
import type { ApplicationNotification } from '../../entities/notification/Notification'
import type { FakeApplication } from '../../../infra/applications/FakeApplication'
import type { InterfaceView } from '../../entities/InterfaceView'
import type { Cleavage } from '../../entities/Cleavage'
import type { Music } from '../../entities/music/Music'
import type { Sound } from '../../entities/sound'
import { detailedComparisonMessage, stringifyWithDetailledSetAndMap } from './unitTests'

export const theInterfaceGatewayHasNotifications = (gherkinPrefix: Gherkin, application: FakeApplication, expectedNotifications: ApplicationNotification[] | ApplicationNotification) => {
    const notifications = Array.isArray(expectedNotifications) ? expectedNotifications : [expectedNotifications]
    return it(`${gherkinPrefix} the notifications are sents : ${notifications.map(notification => JSON.stringify(notification)).join(',\n')}`, () => {
        expect(application.gateways.interface.notifications).deep.equal(notifications)
    })
}

export const theInterfaceGatewayHasCurrentView = (gherkinPrefix:Gherkin, application: FakeApplication, expectedInterfaceView: InterfaceView):Test =>
    it(`${gherkinPrefix} the interface gateway has the current view '${expectedInterfaceView}'.`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) application.gateways.interface.currentView = expectedInterfaceView
        expect(application.gateways.interface.currentView).equal(expectedInterfaceView)
    })

export const theInterfaceGatewayHasCurrentCleavage = (gherkinPrefix:Gherkin, application: FakeApplication, expectedCleavage: Cleavage):Test =>
    it(`${gherkinPrefix} the interface gateway has the current cleavage : '${stringifyWithDetailledSetAndMap(expectedCleavage)}'.`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) application.gateways.interface.currentCleavage = expectedCleavage
        expect(application.gateways.interface.currentCleavage).deep.equal(expectedCleavage, detailedComparisonMessage(application.gateways.interface.currentCleavage, expectedCleavage))
    })

export const theInterfaceGatewayDontHaveCleavage = (gherkinPrefix:Gherkin, application: FakeApplication):Test =>
    it(`${gherkinPrefix} the interface gateway don't have cleavage.`, () => expect(application.gateways.interface.currentCleavage).equal(undefined))

export const theInterfaceGatewayHasPlayingSounds = (gherkinPrefix:Gherkin, application: FakeApplication, expectedPlayingSounds: Sound|Sound[]):Test => {
    const sounds : Sound[] = Array.isArray(expectedPlayingSounds) ? expectedPlayingSounds : [expectedPlayingSounds]
    return it(`${gherkinPrefix} the interface gateway is playing sounds : '${JSON.stringify(sounds)}'.`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) application.gateways.interface.playingSounds = sounds
        expect(application.gateways.interface.playingSounds).deep.equal(sounds)
    })
}

export const theInterfaceGatewayHasCurrentSoundVolume = (gherkinPrefix:Gherkin, application: FakeApplication, expectedSoundVolume: number):Test => {
    return it(`${gherkinPrefix} the interface gateway has current music volume set to '${expectedSoundVolume}'.`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) application.gateways.interface.soundVolume = expectedSoundVolume
        expect(application.gateways.interface.soundVolume).deep.equal(expectedSoundVolume)
    })
}

export const theInterfaceGatewayHasCurrentMusicVolume = (gherkinPrefix:Gherkin, application: FakeApplication, expectedMusicVolume: number):Test => {
    return it(`${gherkinPrefix} the interface gateway has current music volume set to '${expectedMusicVolume}'.`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) application.gateways.interface.musicVolume = expectedMusicVolume
        expect(application.gateways.interface.musicVolume).deep.equal(expectedMusicVolume)
    })
}

export const theInterfaceGatewayHasPlayingMusic = (gherkinPrefix:Gherkin, application: FakeApplication, expectedPlayingMusic: Music):Test => {
    return it(`${gherkinPrefix} the interface gateway is playing music : '${JSON.stringify(expectedPlayingMusic)}'.`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) application.gateways.interface.playingMusic = expectedPlayingMusic
        expect(application.gateways.interface.playingMusic).deep.equal(expectedPlayingMusic)
    })
}

export const theInterfaceGatewayDontPlayMusic = (gherkinPrefix:Gherkin, application: FakeApplication):Test => {
    return it(`${gherkinPrefix} the interface gateway don't play music.`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) application.gateways.interface.playingMusic = undefined
        expect(application.gateways.interface.playingMusic).equal(undefined)
    })
}
