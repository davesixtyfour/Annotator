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

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const imageAspectRatio = img.width / img.height;
      const stageAspectRatio = width / height;

      let newScale: number;
      if (stageAspectRatio > imageAspectRatio) {
        // Stage is wider, scale based on height
        newScale = height / img.height;
      } else {
        // Stage is taller or equal to image, scale based on width
        newScale = width / img.width;
      }

      setScale({ x: newScale, y: newScale });
    };
    img.src = src;
  }, [src, width, height]);

  return (
    <Stage width={width} height={height}>
      <Container>
        <Sprite
          image={src}
          width={width}
          height={height}
          scale={scale}
          anchor={0.5}
          x={width / 2}
          y={height / 2}
        />
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
