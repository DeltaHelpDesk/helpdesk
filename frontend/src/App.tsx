import * as React from 'react';

// Components
import Menu from './components/Menu';
import Todo from './components/Todo';



class App extends React.Component {
  render() {
    return (
        <div className="App">
          <Menu />
          <Todo name={"Apollo-link-state example"}/>
        </div>
    );
  }
}

export default App;
