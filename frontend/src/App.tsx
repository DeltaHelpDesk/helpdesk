import * as React from 'react';

import RouterOutput from './Router';

// Components
// import Menu from './components/Menu';
// import AdministrationContainer from './components/AdministrationContainer';
// import Todo from './components/Todo';
import "./index.css";


class App extends React.Component {
  render() {
    return (
        // <div className="App">
        //   <Menu />
        //   <Todo name={"Apollo-link-state example"}/>
        //   <AdministrationContainer />
        //   <Login mode={true} />
        // </div>
        <>
          <RouterOutput />
        </>
    );
  }
}

export default App;
