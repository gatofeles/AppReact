import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import images from '../static/utils/images';
import '../static/css/materias.css';
import Card from './common/card';

class Materias extends Component {

    splitAssuntosList = (catalogo) => {

        let listaDeAssuntos = [];

        for(let i = 0; i<catalogo.length; i++){
            if(!listaDeAssuntos.includes(catalogo[i].assunto) && catalogo[i].materia ===  this.props.match.params.materia ){
                listaDeAssuntos.push(catalogo[i].assunto);
            }
        }
        return listaDeAssuntos;
    }

     
    render() { 
        const  assuntos = this.splitAssuntosList(this.props.catalogos);

        if(assuntos.length<=0){
            return(<Card mensagem = {"Ainda não temos este material :("}/>);
        }

        return (  

            <React.Fragment>

                <div id ="materias_first" className = "materias_top">
                    <div className = "topSubject">{ this.props.match.params.materia }</div>
                </div>

                        
                <div id = "materiaAlvo" className = "materias">                     
                    {assuntos.map(assunto => (
                    
                            <div key = {assunto} className = "materias-inner"> 
                                <div className = "sub-card">
                                <Link to = {"/"+this.props.match.params.materia+"/"+assunto} > 
                                    <img styles = "width:60px;" className = "subIcon" src= {images['ecologia']} alt="anatomia"/>
                                    <div className = "assunto">{assunto}</div>  
                                </Link>   
                                </div>  
                                <div className = "progresso">
                                    <p>Progresso</p>
                                    <div className = "progress"></div>
                                </div>
                                <div className = "percentage">60%</div>
                            </div> ))
                    }
                </div>

            </React.Fragment>
        );
    }
}

export default Materias;