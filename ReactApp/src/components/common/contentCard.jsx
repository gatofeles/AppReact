import React, { Component } from 'react';
import '../../static/css/conteudo.css';

class ContentCard extends Component {
    
    render() { 

        if(this.props.concluded){
            return(

                <div id = {this.props.id} className = {this.props.class}>
                    <span>{this.props.mensagem.conteudo}</span>
                </div>

            )
        }

        return (
       
            <div id = {this.props.id} className = {this.props.class}>
                <span className="contentMessage">{this.props.mensagem.conteudo}</span>
                <form className="contentForm" onSubmit ={e => this.props.onSubmit({evento:e, resposta:this.props.mensagem.resposta, index:this.props.id})}>
                        <label htmlFor="senha">Corpo da pergunta</label>
                        <input placeHolder = "Coloque aqui sua resposta" onChange = {(e) => this.props.onChange(e.target.value)} className = "answer" type="text" id="answer" name="answer"/>
                        <input id = 'loginBtn'  className = "answerBtn" type="submit" name="Entrar" value="Enviar"/>
                </form>
            </div>
     
        )
    }
}

export default ContentCard;