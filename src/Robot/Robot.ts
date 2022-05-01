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
  #rotateR: Record<Direction, (pos: Position) => Position> = {
    NORTH: (pos: Position) => ({ ...pos, facing: 'EAST' } as Position),
    SOUTH: (pos: Position) => ({ ...pos, facing: 'WEST' } as Position),
    WEST: (pos: Position) => ({ ...pos, facing: 'NORTH' } as Position),
    EAST: (pos: Position) => ({ ...pos, facing: 'SOUTH' } as Position),
  };
  #rotateL: Record<Direction, (pos: Position) => Position> = {
    NORTH: (pos: Position) => ({ ...pos, facing: 'WEST' } as Position),
    SOUTH: (pos: Position) => ({ ...pos, facing: 'EAST' } as Position),
    WEST: (pos: Position) => ({ ...pos, facing: 'SOUTH' } as Position),
    EAST: (pos: Position) => ({ ...pos, facing: 'NORTH' } as Position),
  };
  #isOffTable = (x: number, y: number, table: Table) =>
    x < 0 || x >= table.dimensionX || y < 0 || y >= table.dimensionY
      ? true
      : false;
  #willFall = (pos: Position, table: Table) => {
    const newPos = this.#moveForward[pos.facing](pos);
    return this.#isOffTable(newPos.x, newPos.y, table);
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
    if (this.#willFall(this.#position, this.#table)) return;
    this.#position = this.#moveForward[this.#position.facing](this.#position);
  };
  right = () => {
    if (!this.#position) return;
    this.#position = this.#rotateR[this.#position.facing](this.#position);
    return;
  };
  left = () => {
    if (!this.#position) return;
    this.#position = this.#rotateL[this.#position.facing](this.#position);
    return;
  };
  report = () => {
    if (!this.#position) return;
    return Object.values(this.#position).join(',');
  };
}
