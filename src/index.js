import HypercrudBrowser from './HypercrudBrowser';
import React from 'react';
import ReactDOM from 'react-dom';

/*import events from 'google-closure-library/closure/goog/events/events';
 import History from 'google-closure-library/closure/goog/history/history';


 let h = new History();
 events.listen(h, History.EventType.NAVIGATE, (e) => console.log(e));
 h.setEnabled(true);
 */
let initialState = JSON.parse(document.getElementById('initial-state').textContent);
let entryURI = document.getElementById('service-root').textContent;
let app = <HypercrudBrowser initialState={initialState}
                            entryURI={entryURI}
                            pathname={document.location.pathname}/>;

let idempotentRender = () => ReactDOM.render(app, document.getElementById('root'));

window.app = idempotentRender();
