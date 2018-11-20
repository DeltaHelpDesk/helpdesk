import * as React from 'react';

// Components
import Menu from './components/Menu';
import AdministrationContainer from './components/AdministrationContainer';
import Todo from './components/Todo';



class App extends React.Component {
  render() {
    return (
        <div className="App">
          <Menu />
          <Todo name={"Apollo-link-state example"}/>
          <AdministrationContainer />
        </div>
    );
  }
}

export default App;
