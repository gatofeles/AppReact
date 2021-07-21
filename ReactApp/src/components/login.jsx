import React, { Component } from 'react';
import images from '../static/utils/images';
import '../static/css/login.css'
import axios from 'axios';
import Joi from 'joi';

class Login extends Component {

    state = { user:{
        userName:'',
        password:''
    }}

    validateUser(user){
        const schema = Joi.object({
            userName: Joi.string().max(70).min(3).required(),
            password: Joi.string().max(70).min(3).required(),
            
        });
    
        return schema.validate(user);
    }


    handleSubmit = async e => {

        const blankUser = {
            userName : '',
            password : ''
        };

        e.preventDefault();

        if(e.nativeEvent.submitter.id === 'loginBtn'){
       
            const valid = this.validateUser(this.state.user);
        
            if(valid.error){
                alert(valid.error.message);
                this.setState({user:blankUser});
            }
        
            else{

                try{
                    //TODO: Setar o endereço do backend em config
                    const backEndPoint = process.env.REACT_APP_API_URL;
                    console.log(process.env);
                    const result  = await axios.post(backEndPoint+'/login', this.state.user);
                    
                    console.log(result.headers);
                    localStorage.setItem('token', result.data);
                    this.props.history.push("/");
                }
                catch(e){
                    alert('Usuário ou senha inválidos.');
                    console.log(e);
                } 
            }
        }

        else{
            this.props.history.push("/register");
        }
    }


    handleChange = e => {
        const newUser = {...this.state.user};
        newUser[e.currentTarget.name] = e.currentTarget.value;

       this.setState({user:newUser});
    }


    render() { 
        return (  
        <div className="containerLogin">
            <img id = "loginImage" src={images.login} alt="Logo"/>
            <div className="title">Oi Luigi!</div>
                <form className="form" onSubmit ={this.handleSubmit}>
                    <label htmlFor="userName">Usuário</label>
                    <input onChange = {this.handleChange} className = "loginInput" type="text" id="fname" name="userName"/>
                    <label htmlFor="senha">Senha</label>
                    <input onChange = {this.handleChange} className = "loginInput" type="password" id="senha" name="password"/>
                <div className="buttons">
                    <input id = 'loginBtn' className = "submitBtn" type="submit" name="Entrar" value="Entrar"/>
                    <input id = 'registerBtn' className = "submitBtn" type="submit" name="Registrar" value="Registrar"/>
                </div>
                </form>
        </div>
    
        );
    }
}
 
export default Login;