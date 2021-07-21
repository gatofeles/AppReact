import React, { Component } from 'react';
import images from '../static/utils/images';
import {Link} from 'react-router-dom';
import jwtDecode from 'jwt-decode';


class Navbar extends Component {

    /* Implementar esse método em Models!!! */
    splitMateriasList = (catalogo) => {
        let listaDeMaterias = [];

        for(let i = 0; i<catalogo.length; i++){
            if(!listaDeMaterias.includes(catalogo[i].materia)){
                listaDeMaterias.push(catalogo[i].materia);
            }
        }
        return listaDeMaterias;
    }


    handleDisplay = () => {

        let materias =  document.getElementById("materias");
        let navbar = document.getElementById("sideNav");
        let subject = document.getElementById("materiaOpen");
     
        if(materias.className === "materiaHide"){
             materias.className = "materiaShow";
             navbar.className = "navbarOpen";
             subject.className = "link-textOpen";
             
        }
     
        else{
             materias.className = "materiaHide";
             navbar.className = "navbar";
             subject.className = "link-text";
            
        } 
     }
    
  
    render() { 

        const token = localStorage.getItem('token');

        if(!token){
           window.location.replace("/login");
        }
        
        const user = jwtDecode(token);

        const materias = this.splitMateriasList(this.props.catalogos);

        return ( 
        <React.Fragment>
            <nav id="sideNav" className="navbar">
                <ul className="navbar-nav"> 
                    <li id = "toHome" className="nav-item">
                        <Link to="/" className="nav-link">
                            <img className = "icons" id = "logoHome"  src = {images['home']} alt="home"/>
                            <div id= "home" className="link-text"> 
                                Início
                            </div>
                        </Link>
                    </li>

                    

                    <li onClick = {this.handleDisplay} id = "materiasLista" className = "nav-item">
                        <span className="materiaWrapper">
                            <div className = "nav-link" >
                                <img id = "subject" className = "icons" src= {images['materias']} alt="matérias"/>
                                <div id= "materiaOpen" className="link-text"> 
                                Matérias
                                </div>
                            </div>
                            <ul id="materias" className = "materiaHide">
                                {materias.map((materia) =>  <li key = {materia} ><Link to = {"/"+materia}> {materia}</Link></li>)}
                            </ul>  
                        </span>
                    </li>
                    
    
                    <li id = "exames" className="nav-item">
                        <Link to="#" className="nav-link">
                             <img className = "icons"  src= {images['exames']} alt="exames"/>
                            <span className="link-text"> Exames Anteriores</span>
                        </Link>
                    </li>
    
                    <li id = "desempenho" className="nav-item">
                        <Link to="#" className="nav-link">
                             <img className = "icons"  src= {images['metas']} alt="metas"/>
                            <span className="link-text"> Desempenho </span>
                        </Link>
                    </li>
    
                    <li id = "calendario" className="nav-item">
                        <Link to="#" className="nav-link">
                            <img className = "icons"  src= {images['calendario']} alt="calendario"/>
                            <span className="link-text"> Calendário </span>
                        </Link>
                    </li>
    
                    <li id = "simulados" className="nav-item">
                        <Link to="/simulados" className="nav-link">
                        <img className = "icons" src= {images['simulados']}  alt="simulados"/>
                            <span className="link-text"> Simulados </span>
                        </Link>
                    </li>

                    <li id = "simulados" className={user.isAdmin?"nav-item":"materiaHide"}>
                        <Link to="/add" className="nav-link">
                        <img className = "icons" src= {images['gerenciador']}  alt="gerenciador"/>
                        <span className="link-text"> Gerenciador </span>
                        </Link>
                    </li>
    
    
                    <li id = "ferramentas" className="nav-item">
                        <Link to="/logout" className="nav-link">
                            <img className = "icons" src= {images['ferramentas']}  alt="configurações"/>  
                            <span className="link-text"> Log Out </span>
                        </Link>
                    </li>
                </ul>
            </nav> 
        </React.Fragment>  );
    }
}
 
export default Navbar ;



    

    
