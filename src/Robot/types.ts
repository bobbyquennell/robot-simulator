export type Direction = 'NORTH' | 'SOUTH' | 'WEST' | 'EAST';

export interface Position {
  coordinateX: number;
  coordinateY: number;
  facing: Direction;
}

export interface Table {
  dimensionX: number;
  dimensionY: number;
}
