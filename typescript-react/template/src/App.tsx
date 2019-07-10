import "./assets/main.less";
import * as React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import About from './components/About';


{{#if redux}}
import {Provider} from "react-redux";
import {createStore} from "redux";
const store = createStore(rootReducer);
import rootReducer from "./reducer/index";
import Home from './containers/AddCount';
{{else}}
import Home from './components/Home';
{{/if}}
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
          <Route path="/home" component={Home}/>
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


{{#if redux}}
const Providers  = ()=>(<Provider store={store}><App/></Provider>)
export default Providers;
{{else}}
export default App;
{{/if}}
