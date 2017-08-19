import { Component } from '@angular/core';
import * as _ from 'lodash';

import { Pearbot } from '../../../../src/pearbot/pearbot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pearbot = new Pearbot();

  messages = [];

  constructor() {
    this.pearbot
      .addQuery('add [a] to [b]', args => `result: ${args.a + args.b}`, {
        a: _.toNumber,
        b: _.toNumber
      })
      .addQuery('help me find [x]', args => `I will look for ${args.x}`);
  }

  execute(query: string) {
    this.messages.push({ user: true, message: query });
    let result = this.pearbot.execute(query);
    this.messages.push({ user: false, message: result });
  }
}
