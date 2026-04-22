import type { Size } from './Size'
import type { Position } from './Position'
import type { Entity } from '../tests/Entity'

export interface PhysicalEntity extends Entity {
    position: Position;
    size: Size
}
