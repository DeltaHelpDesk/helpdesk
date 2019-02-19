import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from './theme';
import App from './App';
import client from './graphql/client';
import './index.css';



ReactDOM.render(
  <ApolloProvider client={client}>
       <MuiThemeProvider theme={theme}>
    <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
