import "./assets/main.less";
import * as React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import {Provider} from "react-redux";
import Home from './components/Home';
import About from './components/About';
import HomeWarp from './containers/AddCount';

import rootReducer from "./reducer/index";
import {createStore} from "redux";
const store = createStore(rootReducer);

class App extends React.Component{

  componentDidMount(){
    console.log(this.props)
  }
  render(){
    return (
      <div className="container">
        <Router >
          <h1 style={{margin:"1rem auto","textAlign": "center"}}>hello world</h1>
          <img src={require("./assets/react-icon.png")} style={{"display":"block",margin:"0.5rem auto",width:"2rem"}} />
          <Route path="/home" component={HomeWarp}/>
          <Route path="/about" component={About}/>
          <div style={{"textAlign":"center"}}>
            <Link to="/home" style={{margin:"0.5rem"}}>home</Link>
            <Link to="/about" style={{margin:"0.5rem"}}>about</Link>
          </div>
        </Router>
      </div>
    )
  }
}

const Providers  = ()=>(<Provider store={store}><App/></Provider>)



export default Providers;
