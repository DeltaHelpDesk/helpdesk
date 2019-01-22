import * as React from 'react';

import RouterOutput from './Router';
import "./index.css";
import { AuthContext } from './graphql/auth';



class App extends React.Component {
  render() {
    return (
        <AuthContext.Provider>
          <RouterOutput />
        </AuthContext.Provider>
    );
  }
}

export default App;
