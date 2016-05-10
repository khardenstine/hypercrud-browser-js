import React from 'react';
import {Resolve} from 'HypercrudClient';

function renderHcNode() {

}

function resolveNodeAtPath(client, hcNode, paths) {
  return <div>hi</div>;
}

export default class Inspector extends React.Component {
  render () {
    let {cursor, hcClient, paths} = this.props;

    let renderedClient = hcClient.resolve("/api", (hcNode) => {
      return resolveNodeAtPath(client, hcNode, paths);
    });

    return (
        <div className="hypercrud-browser">
          <Resolve />
          {renderedClient}
        </div>
    );
  }
}