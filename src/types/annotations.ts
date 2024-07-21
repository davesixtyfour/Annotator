import { Coords2D } from './coordinates';

export type COCOAnnotation = {
  area?: number;
  bbox?: [number, number, number, number]; // [top left x, top left y, width, height]
  category_id: number;
  id: number;
  image_id: number;
  iscrowd?: number;
  segmentation?: Coords2D[]; // RLE currently unsupported
};

export type Annotation = {
  id: string;
  label: string;
  bbox?: [number, number, number, number]; // [top left x, top left y, width, height]
  segmentation?: Coords2D[];
};
