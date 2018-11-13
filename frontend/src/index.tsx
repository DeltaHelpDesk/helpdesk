import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import client from './graphql/client';
import './index.css';



ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
