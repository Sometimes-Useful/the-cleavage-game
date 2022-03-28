import type { Position } from '../../../domain/entities/Position'
import type { Size } from '../../../domain/entities/Size'

export abstract class PixiApplicationCommon {
    protected relativePositionToAbsolutePosition (entityRelativePosition: Position, offset: number, resolution: Size): Position {
        const scaleRatio = this.retrieveScaleRatio(resolution)
        return {
            x: entityRelativePosition.x * scaleRatio.width + offset * scaleRatio.width,
            y: entityRelativePosition.y * scaleRatio.height + offset * scaleRatio.height
        }
    }

    protected absolutePositionToRelativePosition (entityRelativePosition: Position, resolution: Size): Size {
        const scaleRatio = this.retrieveScaleRatio(resolution)
        const relativePosition:Size = {
            width: entityRelativePosition.x / scaleRatio.width - this.offset / scaleRatio.width,
            height: entityRelativePosition.y / scaleRatio.height - this.offset / scaleRatio.height
        }
        return relativePosition
    }

    private retrieveScaleRatio (resolution: Size): Size {
        return {
            width: resolution.width / this.drawingZone.width,
            height: resolution.height / this.drawingZone.height
        }
    }

    public drawingZone: Size = { width: 24, height: 24 };
    public offset: number = 0;
    public playerPointerId: string | undefined;
}
