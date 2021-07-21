import React, { Component } from 'react';
import axios from 'axios';
import Joi from 'joi';
import jwtDecode from 'jwt-decode';
import AddTopicos from './addTopicos';

class AddContent extends Component {

    state = {
        content:{
            conteudo:'',
            questao:'',
            resposta:'',
            _id:''
        },

        listSelector:''
    }

    componentDidMount() {

        const token = localStorage.getItem('token');
        const user = jwtDecode(token);
        if(!user.isAdmin){
            alert('Você não tem permissão para acessar esta página.');
            this.props.history.push("/");
        }

       
    }

    splitTopicosList = (catalogo) => {

        let listaDeTopicos = [];

        for(let i = 0; i<catalogo.length; i++){
            if(!listaDeTopicos.includes(catalogo[i].topico) ){
                listaDeTopicos.push(catalogo[i].topico);
            }
        }
        return listaDeTopicos;
    }

    /*

    validateEnter(topico){

        const schema = Joi.object({
            content: Joi.array()
           
        });
    
        return schema.validate(topico);
    }

    */

    handleSubmit = async e => {
        const backEndPoint = process.env.REACT_APP_API_URL;

        e.preventDefault();

        
        try{
            const result  = await axios.post(backEndPoint+'/conteudo/add', this.state.content, {
            headers:{
                'x-auth-token': localStorage.getItem('token')
            }
        });
            alert("Conteúdo inserido com sucesso.");
        }
        catch(ex){

            alert(ex);

        }
        
        
    }

    handleChange = e => {
        const newForm = {...this.state.content};
    
        newForm[e.currentTarget.name] = e.currentTarget.value;

        this.setState({content:newForm});
    }




    handleListChange = e => {

        let newForm = {...this.state.conteudo};

        this.setState({listSelector:e.currentTarget.value});

        console.log(newForm);
        
        const topic = this.props.catalogos.filter(c => c.topico === e.currentTarget.value);
        
        newForm._id = topic[0]._id;

        console.log(newForm);
        
        this.setState({content:newForm});
        
    }






    render() { 
        const topicos = this.splitTopicosList(this.props.catalogos);

        if(!this.props.visibilidade){
            return true;
        }

        return ( 

            <div className = "addTopicos">
                <h2>Tela de adição de conteúdo</h2>
                
                <form className = "addForm" onSubmit ={this.handleSubmit}>
                    <div className="addItem">
                        <label htmlFor="chooseTopic">Lista de tópicos atuais</label>
                        <input list = 'topicList' onChange = {this.handleListChange} value = {this.state.listSelector} name = 'chooseTopic' className = "addInput" type="text" id="chooseTopic" />
                        <datalist id = 'topicList'>
                            {topicos.map((topico)=> <option key = {topicos.indexOf(topico)} value = {topico}/>
                            )}
                        </datalist>
                    </div>


                    <div className="addItem">
                        <label htmlFor="conteudo">Conteudo</label>
                        <input name = 'conteudo'  value = {this.state.content.conteudo} onChange = {this.handleChange}  className = "addContent" type="text" id="conteudo"/>
                    </div>

                    <div className="addItem">
                        <label htmlFor="questao">Questao</label>
                        <input name = 'questao' value = {this.state.content.questao}  onChange = {this.handleChange}  className = "addContent" type="text" id="questao" />
                    </div>

                    <div className="addItem">
                        <label htmlFor="resposta">Resposta</label>
                        <input name = 'resposta' value = {this.state.content.resposta}  onChange = {this.handleChange}  className = "addAnswer"  type="text" id="resposta" />
                    </div>

                    

                    <div className="addItem">
                        <input className = "submitBtn" type="submit" value="Salvar"/>
                    </div>
                    
                </form>
            </div>
         );
    }
}
 
export default AddContent;