import type { Choice } from './Choice'
import type { Player } from './Player'

export class Cleavage {
    constructor (
        public title: string,
        public leftChoice:Choice,
        public rightChoice:Choice,
        public players:Player[] = []
    ) {}
}
