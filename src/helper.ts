import {
  Robot,
  CmdFunctionType,
  Command,
  Direction,
  PlaceFunctionType,
  ErrorType,
} from './Robot';

const execCmd: Record<Command, CmdFunctionType> = {
  PLACE: (bot: Robot) => (x: number, y: number, facing: Direction) =>
    bot.place(x, y, facing),
  LEFT: (bot: Robot) => bot.rotate('LEFT'),

  RIGHT: (bot: Robot) => bot.rotate('RIGHT'),

  MOVE: (bot: Robot) => bot.move(),

  REPORT: (bot: Robot) => bot.report(),
};

export const isCommandType = (input: string): input is Command => {
  return ['PLACE', 'LEFT', 'RIGHT', 'MOVE', 'REPORT'].includes(input);
};
export const executeCmds = (cmds: string[], bot: Robot) => {
  for (const cmd of cmds) {
    const cmdTypeAndArgs = cmd.split(',');
    const cmdType = cmdTypeAndArgs[0] as Command;
    if (!isCommandType(cmdType)) {
      console.log('invalid cmd:', cmdType);
      break;
    }
    if (cmdType !== 'PLACE') {
      execCmd[cmdType](bot);
    } else {
      const x = Number.parseInt(cmdTypeAndArgs[1]?.trim());
      const y = Number.parseInt(cmdTypeAndArgs[2]?.trim());
      const facing = cmdTypeAndArgs[3]?.trim().toUpperCase() as Direction;
      (execCmd[cmdType](bot) as PlaceFunctionType)(x, y, facing);
    }
  }
};
export const isDirectionType = (input: string): input is Direction => {
  return ['NORTH', 'SOUTH', 'EAST', 'WEST'].includes(input);
};
export const errorMsg: Record<ErrorType, (cmd: Command) => string> = {
  NotOnTable: (cmd: Command) => `Not on the table, ignore command: ${cmd}`,
  WillFallOff: (cmd: Command) =>
    `I will fall off the table, ignore command: ${cmd}`,
};
