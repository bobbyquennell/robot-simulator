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
});
