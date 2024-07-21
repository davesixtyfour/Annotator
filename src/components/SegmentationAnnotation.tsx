import React from 'react';
import { Graphics } from '@pixi/react';
import { Coords2D } from '../types/coordinates';

type SegmentationProps = {
  segmentation: Coords2D[];
};

export default function Segmentation({ segmentation }: SegmentationProps) {
  return (
    <Graphics
      draw={(g) => {
        g.lineStyle(2, 0x00ff00, 1);
        g.moveTo(segmentation[0][0], segmentation[0][1]);
        segmentation.slice(1).forEach((point) => {
          const [x, y] = point;
          g.lineTo(x, y);
        });
        g.closePath();
      }}
    />
  );
}
