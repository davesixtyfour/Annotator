import AnnotatedImage from '../components/AnnotatedImage';
import OverheadHouseImage from '../assets/photos/blake-wheeler-zBHU08hdzhY-unsplash.jpg';
import React from 'react';
import { Annotation } from '../types/annotations';

export default {
  title: 'AnnotatedImage',
  component: AnnotatedImage,
  argTypes: {
    width: { control: { type: 'range', min: 200, max: 1000, step: 10 } },
    height: { control: { type: 'range', min: 200, max: 1000, step: 10 } },
  },
};

export const Default = ({ width, height }: { width: number; height: number }) => {
  const annotations: Annotation[] = [
    {
      id: '1',
      label: 'dog',
      bbox: [50, 50, 400, 400],
    },
    {
      id: '2',
      label: 'cat',
      segmentation: [
        [250, 125],
        [375, 187.5],
        [375, 312.5],
        [250, 375],
        [125, 312.5],
        [125, 187.5],
      ],
    },
  ];

  return (
    <>
      <AnnotatedImage
        src={OverheadHouseImage}
        annotations={annotations}
        height={height}
        width={width}
      />
      <div>
        Photo by{' '}
        <a href="https://unsplash.com/@blakesox?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Blake Wheeler
        </a>{' '}
        on{' '}
        <a href="https://unsplash.com/photos/aerial-photography-houses-zBHU08hdzhY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Unsplash
        </a>
      </div>
    </>
  );
};

Default.args = {
  width: 500,
  height: 500,
};
