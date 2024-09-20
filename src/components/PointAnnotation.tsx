import React, { useContext } from 'react';
import { Coords2D } from '../types/coordinates';
import { Graphics, Text } from '@pixi/react';
import { ImageDimensionsContext } from './AnnotatedImage';
import { TextStyle } from '@pixi/text';

type PointAnnotation = {
  coords: Coords2D;
  isPositive: boolean;
};

type PointAnnotationProps = {
  point: PointAnnotation;
};

export default function PointAnnotation({ point }: PointAnnotationProps) {
  const isPositive = point.isPositive;
  const { imageWidth, imageHeight, scale } = useContext(ImageDimensionsContext);

  const radius = 8 / scale.x;
  const lineWidth = 2 / scale.x;
  const fillColor = isPositive ? 0x00 : 0xff0000; // Black for positive, red for negative
  const borderColor = 0xffffff; // White border

  const [x, y] = [
    point.coords[0] * imageWidth - imageWidth / 2,
    point.coords[1] * imageHeight - imageHeight / 2,
  ];

  return (
    <>
      <Graphics
        draw={(g) => {
          g.clear();
          // Circle fill
          g.beginFill(fillColor, 1);
          g.drawCircle(x, y, radius);
          g.endFill();

          // Fully opaque border
          g.lineStyle(lineWidth, borderColor, 1);
          g.drawCircle(x, y, radius);

          // Fully opaque plus or minus sign
          g.lineStyle(lineWidth, borderColor, 1);
          g.moveTo(x - radius / 2, y);
          g.lineTo(x + radius / 2, y);
          if (isPositive) {
            g.moveTo(x, y - radius / 2);
            g.lineTo(x, y + radius / 2);
          }
        }}
      />
      <Text
        text={isPositive ? '+' : '-'}
        x={x}
        y={y}
        anchor={0.5}
        style={
          new TextStyle({
            fontSize: 8 / scale.x,
            fill: borderColor,
            fontWeight: 'bold',
          })
        }
      />
    </>
  );
}
