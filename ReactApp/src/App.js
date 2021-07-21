import './static/css/App.css';
import React, { Component } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/navbar';
import WelcomeCard from './components/welcomeCard';
import Materias from './components/materias';
import Assuntos from  './components/assuntos';
import Gerenciador from './components/gerenciador';
import Logout from './components/logout';
import Conteudo from './components/conteudo';
import './static/css/index.css';


class App extends Component {
  
  state = { 
      catalogos: []
   }
   
   async componentDidMount(){
     //TODO: Precisa pegar a porta direto de config.
     
     const token = localStorage.getItem('token');

      if(!token){
        this.props.history.push("/login");
      }

      else{
        const backEndPoint = process.env.REACT_APP_API_URL;
        const {data:materiasData} = await axios.get(backEndPoint+'/topicos');
        this.setState({catalogos:materiasData});
      }

   }

  render() { 
    return (

    <div className="App">
      <Navbar catalogos = {this.state.catalogos}/>
      <main>
        <div className = "container">
          <Switch>
            <Route path="/logout" component = {Logout}/>  
            <Route path="/add" render = { props => <Gerenciador catalogos = {this.state.catalogos} {...props}/> }/>  
            <Route path="/:materia/:assunto/:topico" render = { props => <Conteudo catalogos = {this.state.catalogos} {...props}/> }/>  
            <Route path="/:materia/:assunto" render = { props => <Assuntos catalogos = {this.state.catalogos} {...props}/> }/>  
            <Route path="/:materia" render = { props => <Materias catalogos = {this.state.catalogos} {...props}/> }/>  
            <Route path="/" component = {WelcomeCard} />
          </Switch>
        </div>
      </main>
    </div>  );
  }
}
 
export default App;
