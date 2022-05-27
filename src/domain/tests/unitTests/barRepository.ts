import { expect } from 'chai'
import { Test, it } from 'mocha'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { Bar } from '../../entities/Bar'
import type { Gherkin } from '../Gherkin'
import type { Table } from '../Table'
import { detailedComparisonMessage, isGiven, stringifyWithDetailledSetAndMap } from './unitTests'
import type { Direction } from '../../entities/Direction'
import type { Stool } from '../../entities/Stool'
import { uniqueOrArrayToArray } from '../../../generic/array'

export const theBarRepositoryHasAvailableTableStool = (gherkinPrefix: Gherkin, stool: Stool | Stool[]) => (application:FakeClientApplication): Test => {
    const stools = uniqueOrArrayToArray(stool)
    return it(`${gherkinPrefix} the Bar repository has available table stools '${JSON.stringify(stools)}'.`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.bar.availableTableStools = stools
        expect(application.repositories.bar.availableTableStools).deep.equal(stools)
    })
}

export const theBarRepositoryHasOccupiedTableStool = (gherkinPrefix: Gherkin, stools: Map<string, Stool>) => (application:FakeClientApplication): Test => {
    return it(`${gherkinPrefix} the Bar repository has occupied table stools '${stringifyWithDetailledSetAndMap(stools)}'.`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.bar.occupiedTableStools = stools
        expect(application.repositories.bar.occupiedTableStools).deep.equal(stools, detailedComparisonMessage(application.repositories.bar.occupiedTableStools, stools))
    })
}

export const theBarRepositoryHasAvailableBarStool = (gherkinPrefix: Gherkin, stool: Stool | Stool[]) => (application:FakeClientApplication): Test => {
    const stools = uniqueOrArrayToArray(stool)
    return it(`${gherkinPrefix} the Bar repository has available bar stools '${JSON.stringify(stools)}'.`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.bar.availableBarStools = stools
        expect(application.repositories.bar.availableBarStools).deep.equal(stools)
    })
}

export const theBarRepositoryHasOccupiedBarStool = (gherkinPrefix: Gherkin, stools: Map<string, Stool>) => (application:FakeClientApplication): Test => {
    return it(`${gherkinPrefix} the Bar repository has occupied bar stools '${stringifyWithDetailledSetAndMap(stools)}'.`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.bar.occupiedBarStools = stools
        expect(application.repositories.bar.occupiedBarStools).deep.equal(stools, detailedComparisonMessage(application.repositories.bar.occupiedBarStools, stools))
    })
}

export const theBarRepositoryHasBar = (gherkinPrefix: Gherkin, bar: Bar) => (application:FakeClientApplication): Test => {
    return it(`${gherkinPrefix} the Bar repository has following bar '${stringifyWithDetailledSetAndMap(bar)}'.`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.bar.bar = bar
        expect(application.repositories.bar.bar).deep.equal(bar, detailedComparisonMessage(application.repositories.bar.bar, bar))
    })
}

export const theBarRepositoryDontHaveTable = (gherkinPrefix: Gherkin) => (application:FakeClientApplication): Test => {
    return it(`${gherkinPrefix} the Bar repository don't have table.`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.bar.tables = []
        expect(application.repositories.bar.tables).deep.equal([])
    })
}

export const theBarRepositoryHasTable = (gherkinPrefix: Gherkin, tables:Table[]) => (application:FakeClientApplication): Test => {
    return it(`${gherkinPrefix} the Bar repository has tables : ${stringifyWithDetailledSetAndMap(tables)}`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.bar.tables = tables
        expect(application.repositories.bar.tables).deep.equal(tables)
    })
}

export const theBarRepositoryHasTableDirection = (gherkinPrefix: Gherkin, direction:Direction) => (application:FakeClientApplication): Test => {
    return it(`${gherkinPrefix} the Bar repository has table direction '${direction}'`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.bar.tableDirection = direction
        expect(application.repositories.bar.tableDirection).deep.equal(direction)
    })
}

export const theBarRepositoryDontHaveAvailableBarStool = (gherkinPrefix: Gherkin) => (application:FakeClientApplication): Test => {
    return it(`${gherkinPrefix} the Bar repository don't has available bar stools`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.bar.availableBarStools = []
        expect(application.repositories.bar.availableBarStools).deep.equal([])
    })
}

export const theBarRepositoryDontHaveAvailableTableStool = (gherkinPrefix: Gherkin) => (application:FakeClientApplication): Test => {
    return it(`${gherkinPrefix} the Bar repository don't has available bar stools`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.bar.availableBarStools = []
        expect(application.repositories.bar.availableTableStools).deep.equal([])
    })
}

export const theBarRepositoryHasAvailableStoolBars = (gherkinPrefix: Gherkin, stools:Stool[]) => (application:FakeClientApplication): Test => {
    return it(`${gherkinPrefix} the Bar repository has the following available bar stools : ${stringifyWithDetailledSetAndMap(stools)}`, () => {
        if (isGiven(gherkinPrefix)) application.repositories.bar.availableBarStools = stools
        expect(application.repositories.bar.availableBarStools).deep.equal(stools)
    })
}
