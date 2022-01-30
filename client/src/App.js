import './App.css';
import Header from './component/Header.js';
import Home from './component/Home.js';
import Register from './component/Register.js';
import Login from './component/Login.js';
import Dashboard from './component/Dashboard.js';
import Search from './component/Search.js';
import Side from "./component/SideNav.js";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App"> 
      <Router>
          <Header/>
          <Side/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/Register" exact component={Register}/>
            <Route path="/Login" exact component={Login}/>
            <Route path="/Dashboard" exact component={Dashboard}/>
            <Route path="/Search" exact component={Search}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
