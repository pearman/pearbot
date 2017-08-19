import * as _ from 'lodash';
import {} from 'jest';

import { Pearbot } from '../pearbot/pearbot';

let pearbot = new Pearbot();

pearbot.addQuery('help me find [x]', args => `I will look up ${args.x}`);

pearbot.addQuery('testing [n] messages', args => `tested ${args.n} messages`);

pearbot.addQuery('what is pork rind', args => `pork rind is awful`);

console.log(pearbot.getCompletions('help me find tacos'));

describe('Pearbot', () => {
  it('can match entries with misspellings', () => {
    expect(pearbot.execute('hlep em find tacos')).toBe('I will look up tacos');
  });

  it('correctly sorts completions', () => {
    let completions = pearbot.getCompletions('pork');
    if (completions.length > 0)
      expect(completions[0].text).toBe('what is pork rind');
    else expect(1).toBe(2);
  });
});
