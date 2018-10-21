import * as React from 'react';

// Components
import Hello from './components/Hello';
import StatefullExample from './components/StatefullExample';
import Menu from './components/Menu';



class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <Hello name={"Delta helpdesk"} />
        <StatefullExample name={"StatefullExample"} />
      </div>
    );
  }
}

export default App;
