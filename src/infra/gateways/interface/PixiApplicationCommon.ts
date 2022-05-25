import type { Position } from '../../../domain/entities/Position'
import type { Size } from '../../../domain/entities/Size'

export abstract class PixiApplicationCommon {
    protected relativePositionToAbsolutePosition (entityRelativePosition: Position, resolution: Size): Position {
        const scaleRatio = this.retrieveScaleRatio(resolution)
        return {
            x: entityRelativePosition.x * scaleRatio.width + this.offset.width * scaleRatio.width,
            y: entityRelativePosition.y * scaleRatio.height + this.offset.height * scaleRatio.height
        }
    }

    protected absolutePositionToRelativePosition (entityRelativePosition: Position, resolution: Size): Size {
        const scaleRatio = this.retrieveScaleRatio(resolution)
        const relativePosition:Size = {
            width: entityRelativePosition.x / scaleRatio.width - this.offset.width / scaleRatio.width,
            height: entityRelativePosition.y / scaleRatio.height - this.offset.height / scaleRatio.height
        }
        return relativePosition
    }

    private retrieveScaleRatio (resolution: Size): Size {
        return {
            width: resolution.width / this.drawingZone.width,
            height: resolution.height / this.drawingZone.height
        }
    }

    public drawingZone: Size = { width: 18, height: 18 };
    private offset: Size = { width: 6, height: 6 };
    public playerPointerId: string | undefined;
}
