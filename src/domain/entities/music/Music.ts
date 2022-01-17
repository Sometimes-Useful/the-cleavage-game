import type { SupportedMusic } from './SupportedMusic'

export class Music {
    constructor (
        public supportedMusic: SupportedMusic,
        public volume: number
    ) { }
}
