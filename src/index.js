import HypercrudBrowser from './HypercrudBrowser';
import HypercrudCient from './HypercrudClient'
import React from 'react';
import ReactDOM from 'react-dom';

/*import events from 'google-closure-library/closure/goog/events/events';
 import History from 'google-closure-library/closure/goog/history/history';


 let h = new History();
 events.listen(h, History.EventType.NAVIGATE, (e) => console.log(e));
 h.setEnabled(true);
*/

//let x = JSON.parse(document.getElementById('initial-state').textContent);
let app = <HypercrudBrowser //initialState={{}}
                            hcClient={new HypercrudCient()}
                            pathname={document.location.pathname}/>;

let idempotentRender = () => ReactDOM.render(app, document.getElementById('root'));

window.app = idempotentRender();
