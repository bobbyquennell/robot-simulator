import { isDirectionType, errorMsg } from '../helper';
import { Direction, Position, RotateCommand, Table } from './types';

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

  #rotate: Record<Direction, (pos: Position, cmd: RotateCommand) => Position> =
    {
      NORTH: (pos: Position, cmd) =>
        ({ ...pos, facing: cmd === 'LEFT' ? 'WEST' : 'EAST' } as Position),
      SOUTH: (pos: Position, cmd) =>
        ({ ...pos, facing: cmd === 'LEFT' ? 'EAST' : 'WEST' } as Position),
      WEST: (pos: Position, cmd) =>
        ({ ...pos, facing: cmd === 'LEFT' ? 'SOUTH' : 'NORTH' } as Position),
      EAST: (pos: Position, cmd) =>
        ({ ...pos, facing: cmd === 'LEFT' ? 'NORTH' : 'SOUTH' } as Position),
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
    console.log('PLACE', x, y, facing);
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      console.log(`Invalid arg x:${x}, y:${y}, not integer, ignore PLACE`);
      return;
    }
    if (!isDirectionType(facing)) {
      console.log(`Invalid arg facing:${facing}, ignore PLACE`);
      return;
    }
    if (this.#isOffTable(x, y, this.#table)) {
      console.log(`Invalid arg x:${x}, y:${y}, not on the table, ignore PLACE`);
      return;
    }
    this.#position = {
      x,
      y,
      facing,
    };
    return;
  };

  move = () => {
    console.log('MOVE');
    if (!this.#position) {
      console.log(errorMsg['NotOnTable']('MOVE'));
      return;
    }
    if (this.#willFall(this.#position, this.#table)) {
      console.log(errorMsg['WillFallOff']('MOVE'));
      return;
    }
    this.#position = this.#moveForward[this.#position.facing](this.#position);
    return;
  };
  rotate = (cmd: RotateCommand) => {
    console.log(cmd);
    if (!this.#position) {
      console.log(errorMsg['NotOnTable'](cmd));
      return;
    }
    this.#position = this.#rotate[this.#position.facing](this.#position, cmd);
    return;
  };
  report = () => {
    console.log('REPORT');
    if (!this.#position) {
      console.log(errorMsg['NotOnTable']('REPORT'));
      return;
    }
    const report = Object.values(this.#position).join(',');
    console.log(`${report}`);
    return report;
  };
}
