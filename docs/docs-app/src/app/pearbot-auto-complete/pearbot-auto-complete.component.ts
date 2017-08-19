import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Pearbot } from '../../../../../src/pearbot/pearbot';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'pearbot-auto-complete',
  templateUrl: './pearbot-auto-complete.component.html',
  styleUrls: ['./pearbot-auto-complete.component.css']
})
export class PearbotAutoCompleteComponent implements OnInit {
  @Input() pearbot: Pearbot;
  @Output() execute = new EventEmitter<string>();

  query = '';
  inputControl = new FormControl();
  options = [];

  ngOnInit() {
    this.inputControl.valueChanges.subscribe(val => {
      if (!val) this.options = this.pearbot.getAllQueries();
      else if (_.isObject(val))
        this.options = this.pearbot.getCompletions(val.text);
      else this.options = this.pearbot.getCompletions(val);
    });
  }

  emitExecute() {
    this.execute.emit(this.query);
    this.query = '';
  }

  displayWith(option) {
    return _.get(option, ['text']);
  }

  setPanelRef(panel) {
    console.log(panel);
    panel.positionY = 'above';
    return 0;
  }
}
