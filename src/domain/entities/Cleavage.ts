import { PlayerCleave } from './PlayerCleave'

export class Cleavage {
    constructor (
        public title: string,
        public cleaveLeft: number = 0,
        public cleaveRight: number = 0,
        public cleaves: Map<string, PlayerCleave> = new Map()
    ) { }
}
