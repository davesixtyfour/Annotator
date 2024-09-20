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
      label: 'house',
      segmentation: [
        [0.32, 0.25],
        [0.43, 0.24],
        [0.44, 0.42],
        [0.32, 0.42],
      ],
    },
    {
      id: '2',
      label: 'house',
      segmentation: [
        [0.47, 0.25],
        [0.58, 0.25],
        [0.58, 0.43],
        [0.47, 0.43],
        [0.47, 0.25],
      ],
    },
    {
      id: '3',
      label: 'house',
      segmentation: [
        [0.48, 0.59],
        [0.59, 0.59],
        [0.59, 0.77],
        [0.48, 0.77],
        [0.47, 0.59],
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
