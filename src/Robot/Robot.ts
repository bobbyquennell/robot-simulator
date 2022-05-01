import { Direction, Position, Table } from './types';

export class Robot {
  #position?: Position = undefined;
  #table: Table;

  get position() {
    return this.#position;
  }
  get table() {
    return this.#table;
  }

  constructor(table?: Table) {
    this.#table = table ?? {
      dimensionX: 5,
      dimensionY: 5,
    };
  }
  #moveForward: Record<Direction, (pos: Position) => Position> = {
    NORTH: (pos: Position) => ({ ...pos, y: pos.y + 1 } as Position),
    SOUTH: (pos: Position) => ({ ...pos, y: pos.y - 1 } as Position),
    WEST: (pos: Position) => ({ ...pos, x: pos.x - 1 } as Position),
    EAST: (pos: Position) => ({ ...pos, x: pos.x + 1 } as Position),
  };
  place = (x: number, y: number, facing: Direction) => {
    this.#position = {
      x,
      y,
      facing,
    };
  };

  move = () => {
    if (!this.#position) return;
    this.#position = this.#moveForward[this.#position.facing](this.#position);
  };
}
