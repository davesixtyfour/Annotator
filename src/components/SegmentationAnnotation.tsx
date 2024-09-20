import React, { useContext } from 'react';
import { Coords2D } from '../types/coordinates';
import { Graphics } from '@pixi/react';
import { ImageDimensionsContext } from './AnnotatedImage';

type SegmentationProps = {
  segmentation: Coords2D[];
};

export default function Segmentation({ segmentation }: SegmentationProps) {
  const { imageWidth, imageHeight, scale } = useContext(ImageDimensionsContext);

  return (
    <Graphics
      draw={(g) => {
        g.clear();
        g.lineStyle(2 / scale.x, 0x00ff00, 1);
        g.beginFill(0x00ff00, 0.2);

        const scaledSegmentation = segmentation.map(([x, y]) => [
          x * imageWidth - imageWidth / 2,
          y * imageHeight - imageHeight / 2,
        ]);

        g.moveTo(scaledSegmentation[0][0], scaledSegmentation[0][1]);
        scaledSegmentation.slice(1).forEach((point) => {
          g.lineTo(point[0], point[1]);
        });
        g.closePath();
        g.endFill();
      }}
    />
  );
}
