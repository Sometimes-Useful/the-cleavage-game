import type { Position } from './Position'
import type { Size } from './Size'
import type { SpriteType } from './SpriteType'

export interface InterfaceEntityState {
    position:Position
    size:Size
    spriteType: SpriteType;
}
