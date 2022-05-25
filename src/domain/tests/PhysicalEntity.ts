import type { Size } from '../entities/Size'
import type { Position } from '../entities/Position'
import type { Entity } from './Entity'

export interface PhysicalEntity extends Entity {
    position: Position;
    size: Size
}
