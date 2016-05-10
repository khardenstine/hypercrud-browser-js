import _ from 'lodash';
import {Cursor} from 'react-cursor';
import HypercrudCient from './HypercrudClient';
import Inspector from './Inspector';
import JsonEditor from '@dustingetz/react-json-editor';
import React from 'react';
import "./styles.css";

export default class HypercrudBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = _.merge({
      'resolved': {},
      'pending': {},
      'cmp-deps': [] // todo this should be in userDependencies
    }, props.initialState);
  }

  render() {
    let cursor = Cursor.build(this);
    let {entryURI, pathname} = this.props;
    let paths = _.drop(_.map(pathname.split("/"), decodeURIComponent), 1);
    let hcClient = new HypercrudCient(entryURI, cursor, {}, (cmp, comp) => cmp.forceUpdate());
    return (
        <div className="container">
          <fieldset>
            <legend>Hypercrud Browser</legend>
            <Inspector cursor={cursor} hcClient={hcClient} paths={paths}/>
          </fieldset>
          <fieldset>
            <legend>React app state</legend>
            <JsonEditor targetCursor={cursor}/>
          </fieldset>
          <div>
            <span>test</span>
            <JsonEditor targetCursor={cursor}/>
          </div>
        </div>
    );
  }
}
