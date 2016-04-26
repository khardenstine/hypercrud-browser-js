import _ from 'lodash';
import {Cursor} from 'react-cursor';
import Inspector from './Inspector';
import JsonEditor from '@dustingetz/react-json-editor';
import React from 'react';
import "./styles.css";

export default class HypercrudBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.initialState;
  }

  render() {
    let cursor = Cursor.build(this);
    let {hcClient, pathname} = this.props;
    let paths = _.drop(_.map(pathname.split("/"), decodeURIComponent), 1);
    return (
        <div className="container">
          <fieldset>
            <legend>Hypercrud Browser</legend>
            <Inspector cursor={cursor} hcClient={hcClient} paths={paths}/>
          </fieldset>
          <fieldset>
            <legend>React app state</legend>
            <JsonEditor targetCursor={cursor} />
          </fieldset>
          <div>
            <span>test</span>
            <JsonEditor targetCursor={cursor} />
          </div>
        </div>
    );
  }
}

HypercrudBrowser.defaultProps = {
  initialState: {}
};