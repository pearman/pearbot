import * as _ from 'lodash';

import { Pearbot } from './pearbot/pearbot';

let pearbot = new Pearbot();

pearbot.addQuery('help me find [x]', args => `I will look up ${args.x}`);

pearbot.addQuery('testing [n] messages', args => `tested ${args.n} messages`);

pearbot.addQuery('what is pork rind', args => `pork rind is awful`);

pearbot.addQuery('add [a] to [b]', args => `result: ${args.a + args.b}`, {
  a: _.toNumber,
  b: _.toNumber
});

console.log(pearbot.getCompletions('help me find tacos'));
console.log(pearbot.execute('hlep me find tacos'));
console.log(pearbot.execute('dad 5 to 6'));
