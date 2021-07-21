import React, { Component } from 'react';
import AddTopicos from './addTopicos';
import UpdateTopic from './updateTopics';
import AddContent from './addContent';
import '../static/css/gerenciador.css';
import Card from './common/card';


class Gerenciador extends Component {

    state = {
        addTopics:false,
        updateTopic:false,
        addContent:false

    }

    handleVisibility = (btn) => {

        switch(btn){
            case 'addTopics':
                this.setState({
                    addTopics:true,
                    updateTopic:false,
                    addContent:false
                });
                break;
            
            case 'updateTopic':
                this.setState({
                    addTopics:false,
                    updateTopic:true,
                    addContent:false
                });
                break;
            
            case 'addContent':
                this.setState({
                    addTopics:false,
                    updateTopic:false,
                    addContent:true
                });
                break;
            
        }

    }
    
    
    render() { 

       
        return (
            <React.Fragment>

                <Card mensagem="Gerenciamento"/>
                <div className="choose">
                    <span className = 'grBtn' onClick = {()=>this.handleVisibility('addTopics')}> Adicionar Tópicos</span>
                    <span className = 'grBtn'  onClick = {()=>this.handleVisibility('updateTopic')}> Corrigir Tópicos</span>
                    <span className = 'grBtn'  onClick = {()=>this.handleVisibility('addContent')}> Adicionar Conteúdo</span>
                </div>
                
                <AddTopicos onActivation = {this.handleVisibility} visibilidade = {this.state.addTopics} />
                <UpdateTopic onActivation = {this.handleVisibility}  visibilidade = {this.state.updateTopic} catalogos = {this.props.catalogos}/>
                <AddContent onActivation = {this.handleVisibility}  visibilidade = {this.state.addContent}  catalogos = {this.props.catalogos}/>
              
            </React.Fragment>
            
        );
    }
}
 
export default Gerenciador;