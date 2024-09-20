import React, { useContext } from 'react';
import { Graphics } from '@pixi/react';
import { ImageDimensionsContext } from './AnnotatedImage';

type BoundingBoxProps = {
  bbox: [number, number, number, number];
};

export default function BoundingBox({ bbox }: BoundingBoxProps) {
  const { imageWidth, imageHeight, scale } = useContext(ImageDimensionsContext);

  return (
    <Graphics
      draw={(g) => {
        g.clear();
        g.lineStyle(2 / scale.x, 0xff0000, 1);

        const [x, y, width, height] = bbox;

        const scaledX = x * imageWidth - imageWidth / 2;
        const scaledY = y * imageHeight - imageHeight / 2;
        const scaledWidth = width * imageWidth;
        const scaledHeight = height * imageHeight;

        g.drawRect(scaledX, scaledY, scaledWidth, scaledHeight);
      }}
    />
  );
}
