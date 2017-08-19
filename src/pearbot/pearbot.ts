import * as _ from 'lodash';
import * as Fuse from 'fuse.js';

interface Query {
  text: string;
  resp: (args) => string;
  parsers: { [arg: string]: (arg) => any };
}

export class Pearbot {
  private _queries: Array<Query> = [];
  private _fuseOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 128,
    minMatchCharLength: 1,
    keys: ['text']
  };

  public noMessageFoundError = 'Could not find that query';
  public argumentsNotFoundError = 'Could not match query arguments';

  addQuery(
    text: string,
    resp: (args) => string,
    parsers?: { [arg: string]: () => any }
  ): Pearbot {
    this._insertQuery({ text, resp, parsers });
    return this;
  }

  getAllQueries(): Array<Query> {
    return this._queries;
  }

  getCompletions(text: string, limit = 10): Array<Query> {
    let fuse = new Fuse(this._queries, this._fuseOptions);
    return <Array<Query>>fuse.search(text);
  }

  execute(text: string, query?: Query): any {
    if (_.isUndefined(query)) {
      let messages = this.getCompletions(text);
      query = _.get(messages, [0]);
      if (_.isUndefined(query)) return this.noMessageFoundError;
    }

    if (query.text.split(' ').length !== text.split(' ').length)
      return this.argumentsNotFoundError;

    let argIndices = query.text
      .split(' ')
      .map((word, index) => ({ word, index }))
      .filter(({ word, index }) => word.match(/\[(.*?)\]/))
      .map(({ word, index }) => ({ word: word.replace(/[\[\]]/g, ''), index }));
    let args = text
      .split(' ')
      .map((value, indexIn) => {
        let arg = _.find(
          argIndices,
          ({ index }) => index === indexIn,
          undefined
        );
        if (!_.isUndefined(arg)) {
          let parsedValue = value;
          let parser = _.get(query, ['parsers', arg.word]);
          if (_.isFunction(parser)) parsedValue = parser(value);

          return { value: parsedValue, key: arg.word, index: arg.index };
        }
        return undefined;
      })
      .filter(result => !_.isUndefined(result));

    let argMap = {};
    args.forEach(({ value, key, index }) => (argMap[key] = value));
    return query.resp(argMap);
  }

  private _insertQuery(newMessage: Query) {
    this._queries.push(newMessage);
  }
}
