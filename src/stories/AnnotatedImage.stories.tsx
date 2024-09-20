import React from 'react';
import AnnotatedImage from '../components/AnnotatedImage';
import OverheadHouseImage from '../assets/photos/blake-wheeler-zBHU08hdzhY-unsplash.jpg';
import { Annotation } from '../types/annotations';
import { fn } from '@storybook/test';

export default {
  title: 'AnnotatedImage',
  component: AnnotatedImage,
  argTypes: {
    width: { control: { type: 'range', min: 200, max: 1000, step: 10 } },
    height: { control: { type: 'range', min: 200, max: 1000, step: 10 } },
    onClick: { action: 'click' },
  },
  args: {
    onClick: fn(),
  },
};

export const Default = ({
  width,
  height,
  onClick,
}: {
  width: number;
  height: number;
  onClick: (x: number, y: number) => void;
}) => {
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
    {
      id: '4',
      label: 'positive point',
      point: {
        coords: [0.3, 0.3],
        isPositive: true,
      },
    },
    {
      id: '5',
      label: 'negative point',
      point: {
        coords: [0.7, 0.7],
        isPositive: false,
      },
    },
  ];

  return (
    <>
      <AnnotatedImage
        src={OverheadHouseImage}
        annotations={annotations}
        height={height}
        width={width}
        onClick={onClick}
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
