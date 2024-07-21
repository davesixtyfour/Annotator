import React from 'react';
import { Graphics } from '@pixi/react';

type BoundingBoxProps = {
  bbox: number[];
};

export default function BoundingBox({ bbox }: BoundingBoxProps) {
  const [x, y, width, height] = bbox;
  return (
    <Graphics
      draw={(g) => {
        g.lineStyle(2, 0xff0000, 1);
        g.drawRect(x, y, width, height);
      }}
    />
  );
}
