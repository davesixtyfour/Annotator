import BoundingBox from './BoundingBoxAnnotation';
import React, { useState, useEffect, createContext } from 'react';
import Segmentation from './SegmentationAnnotation';
import { Annotation } from '../types/annotations';
import { Container, Sprite, Stage } from '@pixi/react';

type ImageDimensionsContextType = {
  imageWidth: number;
  imageHeight: number;
  scale: { x: number; y: number };
};

export const ImageDimensionsContext = createContext<ImageDimensionsContextType>({
  imageWidth: 0,
  imageHeight: 0,
  scale: { x: 1, y: 1 },
});

type AnnotatedImageProps = {
  annotations: Annotation[];
  height: number;
  src: string;
  width: number;
};

export default function AnnotatedImage({ annotations, height, src, width }: AnnotatedImageProps) {
  const [scale, setScale] = useState({ x: 1, y: 1 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const imageAspectRatio = img.width / img.height;
      const containerAspectRatio = width / height;

      let newScale: { x: number; y: number };

      if (containerAspectRatio > imageAspectRatio) {
        newScale = { x: height / img.height, y: height / img.height };
      } else {
        newScale = { x: width / img.width, y: width / img.width };
      }

      setScale(newScale);
      setImageSize({ width: img.width, height: img.height });
      setImageLoaded(true);
    };
    img.src = src;
  }, [src, width, height]);

  if (!imageLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Stage width={width} height={height}>
      <ImageDimensionsContext.Provider
        value={{
          imageWidth: imageSize.width,
          imageHeight: imageSize.height,
          scale,
        }}
      >
        <Container scale={scale} x={width / 2} y={height / 2}>
          <Sprite image={src} anchor={0.5} width={imageSize.width} height={imageSize.height} />
          {annotations.map((annotation) => (
            <React.Fragment key={annotation.id}>
              {annotation.bbox && <BoundingBox bbox={annotation.bbox} />}
              {annotation.segmentation && <Segmentation segmentation={annotation.segmentation} />}
            </React.Fragment>
          ))}
        </Container>
      </ImageDimensionsContext.Provider>
    </Stage>
  );
}
