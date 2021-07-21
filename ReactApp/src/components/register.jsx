import React, { Component } from 'react';
import '../static/css/addMaterias.css';
import axios from 'axios';
import Joi from 'joi';

//TODO: Verificar duplicidade de usuários e e-mails no front.

class Register extends Component {
    state = {  
        user : {
            userName: '',
            email: '',
            password:''
        }
    }

    validateUser(user){
        const schema = Joi.object({
            userName: Joi.string().max(70).min(3).required(),
            password: Joi.string().max(70).min(3).required(),
            email:  Joi.string().email({ tlds: { allow: false } }).max(70).min(3).required()
        });
    
        return schema.validate(user);
    }

    handleSubmit = async e => {

        const blankUser = {
            userName : '',
            email : '',
            password : ''
        };

        e.preventDefault();
       
        const valid = this.validateUser(this.state.user);

       
        if(valid.error){
            alert(valid.error.message);
            this.setState({user:blankUser});
        }
    
        else{
        try{

            const backEndPoint = process.env.REACT_APP_API_URL;
            const result  = await axios.post(backEndPoint+'/users/register', this.state.user);
            alert("Usuário registrado com sucesso.");
            localStorage.setItem('token', result.data);
            this.props.history.push("/");
           
        }
        catch(e){
            alert('Usuário ou email já utilizado.');
            console.log(e);
        }
        
        this.setState({user:blankUser});

        }

        
        
    }

    handleChange = e => {
        const newUser = {...this.state.user};

        newUser[e.currentTarget.name] = e.currentTarget.value;

        this.setState({user:newUser});
    }

    render() { 
        return ( 

            <div className = "addTopicos">
                <h2>Tela de registro de usuário</h2>
                <h3>Entre com seus dados nos campos abaixo para se cadastrar</h3>
                <form className = "addForm" onSubmit ={this.handleSubmit}>
                    <div className="addItem">
                        <label htmlFor="userName">Usuário</label>
                        <input name = 'userName'  value = {this.state.user.userName} onChange = {this.handleChange} autoFocus className = "addInput" type="text" id="userName" />
                    </div>
                    <div className="addItem">
                        <label htmlFor="password">Senha</label>
                        <input name = 'password' value = {this.state.user.password}  onChange = {this.handleChange} className = "addInput"  type="password" id="password" />
                    </div>
                    <div className="addItem">
                        <label htmlFor="email">E-mail</label>
                        <input name = 'email' value = {this.state.user.email}  onChange = {this.handleChange} className = "addInput"  type="text" id="email" />
                    </div>
                    <div className="addItem">
                        <input className = "submitBtn" type="submit" value="Salvar"/>
                    </div>
                </form>
            </div>

         );
    }
}
 
export default Register;