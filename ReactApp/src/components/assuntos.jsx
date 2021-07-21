import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../static/css/materias.css';
import Card from './common/card';

class Assuntos extends Component {


    splitTopicosList = (catalogo) => {

        let listaDeTopicos = [];

        for(let i = 0; i<catalogo.length; i++){
            if(catalogo[i].assunto ===  this.props.match.params.assunto ){
                listaDeTopicos.push(catalogo[i].topico);
            }
        }
        return listaDeTopicos;
    }

    render() { 

        const  topicos = this.splitTopicosList(this.props.catalogos);

        if(topicos.length<=0){
            return(<Card mensagem = {"Ainda não temos este material :("}/>);
        }

        return (  

            <React.Fragment>

            <div id ="materias_first" className = "materias_top">
                <div className = "topSubject">{ this.props.match.params.assunto }</div>
            </div>

                    
            <div id = "materiaAlvo" className = "materias">                     
                {topicos.map(topico => (
                
                        <div key = {topico} className = "materias-inner"> 
                            <div className = "sub-card">
                            <Link to = {"/"+this.props.match.params.materia+"/"+this.props.match.params.assunto+"/"+topico} > 
                                <div className = "assunto">{topico}</div>  
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
 
export default Assuntos;