import BoundingBox from './BoundingBoxAnnotation';
import React, { useState, useEffect } from 'react';
import Segmentation from './SegmentationAnnotation';
import { Annotation } from '../types/annotations';
import { Container, Sprite, Stage } from '@pixi/react';

type AnnotatedImageProps = {
  annotations: Annotation[];
  height: number;
  src: string;
  width: number;
};

export default function AnnotatedImage({ annotations, height, src, width }: AnnotatedImageProps) {
  const [scale, setScale] = useState({ x: 1, y: 1 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const imageAspectRatio = img.width / img.height;
      const containerAspectRatio = width / height;

      let newScale: { x: number; y: number };

      if (containerAspectRatio > imageAspectRatio) {
        // Container is wider, scale based on height
        newScale = { x: height / img.height, y: height / img.height };
      } else {
        // Container is taller or equal, scale based on width
        newScale = { x: width / img.width, y: width / img.width };
      }

      setScale(newScale);
      setImageSize({ width: img.width * newScale.x, height: img.height * newScale.y });
    };
    img.src = src;
  }, [src, width, height]);

  return (
    <Stage width={width} height={height}>
      <Container
        scale={scale}
        width={imageSize.width}
        height={imageSize.height}
        x={width / 2}
        y={height / 2}
        anchor={0.5}
      >
        <Sprite image={src} anchor={0.5} />
        {annotations.map((annotation) => (
          <React.Fragment key={annotation.id}>
            {annotation.bbox && <BoundingBox bbox={annotation.bbox} />}
            {annotation.segmentation && <Segmentation segmentation={annotation.segmentation} />}
          </React.Fragment>
        ))}
      </Container>
    </Stage>
  );
}
