import { executeCmds } from '../helper';
import { Robot } from './Robot';
import { Direction, Position } from './types';

describe('1. A Robot executes:', () => {
  describe('PLACE', () => {
    it("exec valid PLACE cmd, should update it's position as expected", () => {
      const x = 0;
      const y = 0;
      const facing = 'NORTH';
      const sut = new Robot();
      const expected = {
        x,
        y,
        facing,
      } as Position;
      sut.place(x, y, facing);
      expect(sut.position).toEqual(expected);
    });

    it.each([
      [2, 0, 'MELBOURNE', undefined],
      [10, 0, 'NORTH', undefined],
      [NaN, NaN, 'NORTH', undefined],
      [-1, -2, 'NORTH', undefined],
    ])(
      'exec invalid PLACE cmd with: x: %d, y: %d, f: %s, should not update its position',
      (x, y, facing, expected) => {
        const sut = new Robot();
        sut.place(x, y, facing as Direction);
        expect(sut.position).toEqual(expected);
      },
    );
  });

  describe('MOVE', () => {
    it.each([
      [0, 0, 'NORTH', { x: 0, y: 1, facing: 'NORTH' }],
      [0, 2, 'EAST', { x: 1, y: 2, facing: 'EAST' }],
      [1, 2, 'WEST', { x: 0, y: 2, facing: 'WEST' }],
      [1, 2, 'SOUTH', { x: 1, y: 1, facing: 'SOUTH' }],
    ])(
      'with current location: x: %d, y: %d, f: %s, should move 1 step forward to: %s',
      (x, y, facing, expectedPosition) => {
        const sut = new Robot();
        sut.place(x, y, facing as Direction);
        sut.move();
        expect(sut.position).toEqual(expectedPosition);
      },
    );
  });

  describe('ROTATE', () => {
    it('when exec LEFT or RIGHT, should rotate 90 degrees without changing position', () => {
      const sut = new Robot();
      sut.place(0, 0, 'NORTH');
      sut.left();
      expect(sut.position).toEqual({ x: 0, y: 0, facing: 'WEST' } as Position);
      sut.right();
      sut.right();
      expect(sut.position).toEqual({ x: 0, y: 0, facing: 'EAST' } as Position);
    });
  });

  describe('REPORT', () => {
    it('should return the location and current facing direction', () => {
      const sut = new Robot();
      sut.place(0, 0, 'NORTH');
      expect(sut.report()).toEqual('0,0,NORTH');
      sut.move();
      expect(sut.report()).toEqual('0,1,NORTH');
      sut.right();
      expect(sut.report()).toEqual('0,1,EAST');
    });
  });
});

describe('2. A Robot should prevent falling', () => {
  it.each([[['PLACE, 0,0,NORTH', 'LEFT', 'MOVE'], '0,0,WEST']])(
    'when exec cmds: %s, should ignore dangerous cmds, and stop at final position: %s',
    (cmds, finalPosition) => {
      const sut = new Robot();
      executeCmds(cmds, sut);
      expect(sut.report()).toEqual(finalPosition);
    },
  );
});
