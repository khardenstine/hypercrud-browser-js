require('es6-promise').polyfill();
require('isomorphic-fetch');


import React from 'react';

function resolveRootRelativeURI(entryURI, relativeURI) {
  return entryURI + relativeURI; // todo heh
}

export class Resolve extends React.Component {
  render() {
    let {hcClient, hcNode, cmp} = this.props;

    //let buildNewCmp = () => <Resolve hcClient={hcClient} hcNode={hcNode} cmp={cmp}/>;
    //let promise = this.props.hcClient.resolve(hcClient, hcNode, this, buildNewCmp);
    return <div>hi2</div>;
  }
}

export default class HypercrudClient {
  constructor(entryURI, globalState, userDependencies, forceUpdate) {
    console.log("Building HC Client");

    this.entryURI = entryURI;
    this.globalState = globalState;
    this.userDependencies = userDependencies;
    this.forceUpdate = forceUpdate;
  }

  read(relativeURI) {
    console.assert(!!relativeURI);
    let start = Date.now();
    var options = {
      uri: resolveRootRelativeURI(this.entryURI, relativeURI),
      headers: {
        // todo
      }
    };

    rp(options).finally(() => console.log("Request took: " + (Date.now() - start) + "ms"));
  }

  resolve(relativeURI, cmp, buildNewCmp) {
    let {resolved, pending} = this.globalState.value();
    if (relativeURI in resolved) {
      return resolved[relativeURI];
    }
    else {
      //this.globalState.refine('cmp-deps').merge(cmp);
      if (relativeURI in pending) {
        return pending[relativeURI]
            .finally(() => {
                this.globalState.refine('cmp-deps').dissoc(cmp); // todo this should be in userDependencies
                this.forceUpdate(cmp, buildNewCmp);
            });
      }
      else {
        let hcResponseNodePromise = this.read(relativeURI)
            .then((responseBody) => {
              // todo parse transit
              let hcResponseNode = responseBody.hypercrud;
              this.globalState.refine('resolved').swap(m => m.put(relativeURI, hcResponseNode));
              // todo merge responseBody.cache into resolved
              this.globalState.refine('pending').dissoc(relativeURI);
              this.globalState.refine('cmp-deps').dissoc(cmp);
              this.forceUpdate(cmp, buildNewCmp);
              return hcResponseNode;
            })
            .catch((error) => {
              this.globalState.refine('pending').dissoc(relativeURI);
              this.globalState.refine('rejected').swap(m => m.put(relativeURI, error));
              this.globalState.refine('cmp-deps').dissoc(cmp);
              this.forceUpdate(cmp, buildNewCmp);
              return Promise.reject(error);
            });

        this.state.refine('pending').swap(m => m.put(relativeURI, hcResponseNodePromise));
        this.userDependencies.assoc(relativeURI);
        return hcResponseNodePromise;
      }
    }
  }
}

