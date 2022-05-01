import { Robot } from './Robot';
import { Position } from './types';

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
    it('should move 1 step forward in the direction of current facing', () => {
      const sut = new Robot();
      sut.place(0, 0, 'NORTH');
      sut.move();
      expect(sut.position).toEqual({ x: 0, y: 1, facing: 'NORTH' });
    });
  });
});
