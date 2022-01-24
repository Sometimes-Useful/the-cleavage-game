import type { PlayerCleave } from './PlayerCleave'

export class Cleavage {
    constructor (
        public title: string,
        public cleaves: Map<string, PlayerCleave | undefined> = new Map()
    ) { }
}
