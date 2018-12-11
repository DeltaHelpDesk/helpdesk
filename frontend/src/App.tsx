import * as React from 'react';

// Components
import Menu from './components/Menu';
import AdministrationContainer from './components/AdministrationContainer';
import Todo from './components/Todo';
import Login from './components/Login';
import TaskList from './components/TaskList';


class App extends React.Component {
  render() {
    return (
        <div className="App">
          <Menu />
          <TaskList />
          <Todo name={"Apollo-link-state example"}/>
          <AdministrationContainer />
          <Login mode={true} />
        </div>
    );
  }
}

export default App;
