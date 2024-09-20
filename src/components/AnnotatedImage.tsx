import React, { useState, useEffect, createContext } from 'react';
import BoundingBox from './BoundingBoxAnnotation';
import PointAnnotation from './PointAnnotation';
import Segmentation from './SegmentationAnnotation';
import { Annotation } from '../types/annotations';
import { Container, Sprite, Stage } from '@pixi/react';
import { FederatedPointerEvent } from '@pixi/events';
import '@pixi/events'; // Necessary for interactivity

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
  onClick?: (x: number, y: number) => void;
};

export default function AnnotatedImage({
  annotations,
  height,
  src,
  width,
  onClick,
}: AnnotatedImageProps) {
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

  const handleClick = (event: FederatedPointerEvent) => {
    if (!onClick || !imageLoaded) return;

    const x = event.global.x / (scale.x * imageSize.width);
    const y = event.global.y / (scale.y * imageSize.height);

    onClick(x, y);
  };

  if (!imageLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Stage
      width={width}
      height={height}
      options={{ antialias: true, autoDensity: true, resolution: window.devicePixelRatio || 1 }}
    >
      <ImageDimensionsContext.Provider
        value={{
          imageWidth: imageSize.width,
          imageHeight: imageSize.height,
          scale,
        }}
      >
        <Container scale={scale} x={width / 2} y={height / 2}>
          <Sprite
            image={src}
            anchor={0.5}
            width={imageSize.width}
            height={imageSize.height}
            click={handleClick}
            interactive={true}
          />
          {annotations.map((annotation) => (
            <React.Fragment key={annotation.id}>
              {annotation.bbox && <BoundingBox bbox={annotation.bbox} />}
              {annotation.segmentation && <Segmentation segmentation={annotation.segmentation} />}
              {annotation.point && <PointAnnotation point={annotation.point} />}
            </React.Fragment>
          ))}
        </Container>
      </ImageDimensionsContext.Provider>
    </Stage>
  );
}
