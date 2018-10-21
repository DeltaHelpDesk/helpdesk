import App from './App';
import './components/Menu';
import './index.css';

import registerServiceWorker from './registerServiceWorker';


import * as React from 'react';
import * as ReactDOM from 'react-dom';


ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
