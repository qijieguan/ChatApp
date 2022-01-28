import './App.css';
import Header from './component/Header.js';
import Home from './component/Home.js';
import Register from './component/Register.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//mongodb+srv://qijieguan:<qijieguan1819>@cluster0.b2u5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

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
