import fs from 'fs';
import path from 'path';
import { Robot } from './Robot';
import { executeCmds } from './helper';

const data = fs.readFileSync(path.resolve(__dirname, 'commands.txt'));

const cmds: string[] = data.toString().trim().split('\n');
const bot = new Robot();

executeCmds(cmds, bot);
