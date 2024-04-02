import "./App.css";
import Header from "./component/Header.js";
import Home from "./component/Home.js";
import Register from "./component/Register.js";
import Login from "./component/Login.js";
import Dashboard from "./component/Dashboard.js";
import About from "./component/About.js";
import Footer from "./component/Footer.js";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { createStore } from "redux";
import allReducers from "./component/reducers";
import { Provider } from "react-redux";

const store = createStore(
  allReducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <div className="App"> 
      <Provider store={store}>
        <Router>
            <Header/>
            <Routes>
              <Route path="/" element={<Home/>} exact/>
              <Route path="/Register" element={<Register/>} exact/>
              <Route path="/Login" element={<Login/>} exact/>
              <Route path="/About" element={<About/>} exact/>

              <Route path="/Dashboard/:param?/:param?/:param?" element={<Dashboard/>} exact/>
              
            </Routes>
            <Footer/>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
