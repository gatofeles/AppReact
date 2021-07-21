import React, { Component } from 'react';
import axios from 'axios';
import Joi from 'joi';
import jwtDecode from 'jwt-decode';
import AddTopicos from './addTopicos';

class UpdateTopic extends Component {

    state = {
        listSelector:'',
        form : {
            materia:'',
            assunto:'',
            topico:'',
            preReqs:[],
            _id:''
        }
        
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

    validateEnter(topico){

        const schema = Joi.object({
            materia: Joi.string().max(70).min(3).required(),
            assunto: Joi.string().max(70).min(3).required(),
            topico:  Joi.string().max(70).min(3).required(),
            preReqs:Joi.array().required(),
            _id:Joi.string().max(1500).min(3).required(),
        });
    
        return schema.validate(topico);
    }

    handleSubmit = async e => {
        const backEndPoint = process.env.REACT_APP_API_URL;

        e.preventDefault();

        const valid = this.validateEnter(this.state.form);
        if(valid.error){
            alert(valid.error.message);
        }
        else{
            try{
                const result  = await axios.put(backEndPoint+'/topicos/update', this.state.form, {
                headers:{
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            alert("Tópico alterado com sucesso.");
            }
            catch(ex){

                alert(ex);

            }
        }
        
    }

    handleChange = e => {
        const newForm = {...this.state.form};

        if(e.currentTarget.name === 'preReqs'){
            let list = e.currentTarget.value.split(',');
            newForm[e.currentTarget.name] = list;
        }

        else{
            newForm[e.currentTarget.name] = e.currentTarget.value;
        }

        this.setState({form:newForm});
    }




    handleListChange = e => {

        let newForm = {...this.state.form};
        this.setState({ listSelector:e.currentTarget.value});
        const topic = this.props.catalogos.filter(c => c.topico === e.currentTarget.value);
        
        console.log(topic[0]);
       
        newForm.materia = topic[0].materia;
        newForm.assunto = topic[0].assunto;
        newForm.topico = topic[0].topico;
        newForm.preReqs = topic[0].preReqs;
        newForm._id = topic[0]._id;
        
        console.log(newForm);

        this.setState({form:newForm});
        this.setState({currentId:topic[0]._id});
        
    }






    render() { 
        const topicos = this.splitTopicosList(this.props.catalogos);
        if(!this.props.visibilidade){
            return true;
        }

        return ( 

            <div className = "addTopicos">
                <h2>Tela de correção de tópicos</h2>
                
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
                        <label htmlFor="materia">Materia</label>
                        <input name = 'materia'  value = {this.state.form.materia} onChange = {this.handleChange}  className = "addInput" type="text" id="materia" />
                    </div>
                    <div className="addItem">
                        <label htmlFor="assunto">Assunto</label>
                        <input name = 'assunto' value = {this.state.form.assunto}  onChange = {this.handleChange}  className = "addInput"  type="text" id="assunto" />
                    </div>
                    <div className="addItem">
                        <label htmlFor="topico">Tópico</label>
                        <input name = 'topico' value = {this.state.form.topico}  onChange = {this.handleChange} className = "addInput"  type="text" id="topico" />
                    </div>
                    <div className="addItem">
                        <label htmlFor="preReq">Pré-Requisitos</label>
                        <input name = 'preReqs' value = {this.state.form.preReqs}  onChange = {this.handleChange} className = "addInput"  type="text" id="preReq"/>
                    </div>
                    <div className="addItem">
                        <input className = "submitBtn" type="submit" value="Salvar"/>
                    </div>
                </form>
            </div>
         );
    }
}
 
export default UpdateTopic;