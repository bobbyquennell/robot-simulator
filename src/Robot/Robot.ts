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

  place = (x: number, y: number, facing: Direction) => {
    this.#position = {
      coordinateX: x,
      coordinateY: y,
      facing,
    };
  };
}
