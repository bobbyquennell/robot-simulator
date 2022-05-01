export const Directions = {
  North: 'NORTH',
  South: 'SOUTH',
  East: 'EAST',
  West: 'WEST',
} as const;
export type Direction = typeof Directions[keyof typeof Directions];

export interface Coordinate {
  x: number;
  y: number;
}
export interface Position extends Coordinate {
  facing: Direction;
}

export interface Table {
  dimensionX: number;
  dimensionY: number;
}

export const Commands = {
  Place: 'PLACE',
  Left: 'LEFT',
  Right: 'RIGHT',
  Move: 'MOVE',
  Report: 'REPORT',
} as const;
export type Command = typeof Commands[keyof typeof Commands];
