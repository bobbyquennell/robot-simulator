import { Robot } from './Robot/Robot';
import {
  CmdFunctionType,
  Command,
  Direction,
  PlaceFunctionType,
} from './Robot/types';

const execCmd: Record<Command, CmdFunctionType> = {
  PLACE: (bot: Robot) => (x: number, y: number, facing: Direction) =>
    bot.place(x, y, facing),
  LEFT: (bot: Robot) => bot.left(),

  RIGHT: (bot: Robot) => bot.right(),

  MOVE: (bot: Robot) => bot.move(),

  REPORT: (bot: Robot) => bot.report(),
};

export function executeCmds(cmds: string[], bot: Robot) {
  for (const cmd of cmds) {
    const cmdTypeAndArgs = cmd.split(',');
    const cmdType = cmdTypeAndArgs[0] as Command;
    if (cmdType !== 'PLACE') {
      execCmd[cmdType](bot);
    } else {
      const x = Number.parseInt(cmdTypeAndArgs[1]?.trim());
      const y = Number.parseInt(cmdTypeAndArgs[2]?.trim());
      const facing = cmdTypeAndArgs[3]?.trim().toUpperCase() as Direction;
      (execCmd[cmdType](bot) as PlaceFunctionType)(x, y, facing);
    }
  }
}
