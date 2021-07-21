import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import App from './App';
import Login from './components/login';
import Register from './components/register';

class RouterWrapper extends Component {
    
    render() { 
        return ( 
          <Switch>
            <Route path = '/register' component = {Register}/>
            <Route path = '/login' component = {Login} />
            <Route path = '/' component = {App}/>
          </Switch>
         );
    }
}
 
export default RouterWrapper;