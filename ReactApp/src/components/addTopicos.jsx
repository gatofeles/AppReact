import React, { Component } from 'react';
import '../static/css/addMaterias.css';
import axios from 'axios';
import Joi from 'joi';
import jwtDecode from 'jwt-decode';

class AddTopicos extends Component {

    state = {
        form : {
            materia:'',
            assunto:'',
            topico:'',
            preReqs:[]
        },
        atualizar:false
    }

    componentDidMount() {

        const token = localStorage.getItem('token');
        const user = jwtDecode(token);
        if(!user.isAdmin){
            alert('Você não tem permissão para acessar esta página.');
            this.props.history.push("/");
        }
    }

    validateEnter(topico){

        const schema = Joi.object({
            materia: Joi.string().max(70).min(3).required(),
            assunto: Joi.string().max(70).min(3).required(),
            topico:  Joi.string().max(70).min(3).required(),
            preReqs:Joi.array().required()
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
                const result  = await axios.post(backEndPoint+'/topicos/add', this.state.form, {
                headers:{
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            alert("Tópico adicionado com sucesso.");
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

    
    render() { 

        if(!this.props.visibilidade){
            return true;
        }

        return ( 
            <div className = "addTopicos">
                <h2>Tela de adição de tópicos</h2>
                <form className = "addForm" onSubmit ={this.handleSubmit}>
                    <div className="addItem">
                        <label htmlFor="materia">Materia</label>
                        <input name = 'materia'  value = {this.state.form.materia} onChange = {this.handleChange} autoFocus className = "addInput" type="text" id="materia" />
                    </div>
                    <div className="addItem">
                        <label htmlFor="assunto">Assunto</label>
                        <input name = 'assunto' value = {this.state.form.assunto}  onChange = {this.handleChange} autoFocus className = "addInput"  type="text" id="assunto" />
                    </div>
                    <div className="addItem">
                        <label htmlFor="topico">Tópico</label>
                        <input name = 'topico' value = {this.state.form.topico}  onChange = {this.handleChange} className = "addInput"  type="text" id="topico" />
                    </div>
                    <div className="addItem">
                        <label htmlFor="preReq">Pré-Requisitos</label>
                        <input name = 'preReqs' value = {this.state.form.preReqs}  onChange = {this.handleChange} autoFocus className = "addInput"  type="text" id="preReq"/>
                    </div>
                    <div className="addItem">
                        <input className = "submitBtn" type="submit" value="Salvar"/>
                    </div>
                </form>
            </div>
         );
    }
}
 
export default AddTopicos;