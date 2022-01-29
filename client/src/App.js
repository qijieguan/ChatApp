import './App.css';
import Header from './component/Header.js';
import Home from './component/Home.js';
import Register from './component/Register.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App"> 
      <Router>
          <Header/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/Register" exact component={Register}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
