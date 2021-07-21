import React, { Component } from 'react';
import Card from './common/card';
import ContentCard from './common/contentCard';
import MessageCard from './common/cardMessage';
import axios from 'axios';

class Conteudo extends Component {
    state = {  
        counter: 0,
        answer:'', 
        error:false,
        concluded:[],
        topicoId:''
    }

    async componentDidMount() {
        //////Está dando problema para passar  o Id do tópico para depois pegar a lista!
        let conteudo = [];
        let concluded = [];

        const backEndPoint = process.env.REACT_APP_API_URL;
        const topicoId = this.props.catalogos.find(t => t.topico === this.props.match.params.topico);

        
        this.setState({topicoId});

        console.log('----->',this.state.topicoId);

        
        try{
            const result  = await axios.get(backEndPoint+'/conteudo/contentById', this.state.topicoId, {
            headers:{
                'x-auth-token': localStorage.getItem('token')
            }
        });
            console.log('Resultado--->', result);
        }
        catch(ex){

            alert(ex);

        }
     
        
        //////////////////////////////////////////
        /////////////////////////////////////////

        for(let i = 0; i<this.props.catalogos.length; i++){
            if(this.props.catalogos[i].topico ===  this.props.match.params.topico ){
                conteudo = this.props.catalogos[i].content;
            }
        }

        conteudo.map(()=>concluded.push(false));

        this.setState({concluded});
        
    }

    getContent = () => {

    }

    handleSubmit = (e) => {
        e.evento.preventDefault();

        let concluded = [...this.state.concluded];
        
        if(this.state.answer == e.resposta){
            let counter = this.state.counter;
            counter++;
            concluded[e.index] = true;
            this.setState({counter});
            this.setState({error:false});
            this.setState({error:false});
            this.setState({concluded});
           
        }
        else{
            this.setState({error:true});
        }
    }

    handleChange = e => {
        
        const resposta = e;

        this.setState({answer:resposta});
    }

    getContent = (catalogo) => {

        let conteudo = [];

        for(let i = 0; i<catalogo.length; i++){
            if(catalogo[i].topico ===  this.props.match.params.topico ){
                conteudo = catalogo[i].content;
            }
        }
      
        return conteudo;
    }

    render() { 

        const conteudo = this.getContent(this.props.catalogos);

        if(conteudo.length<=0){
            return(<Card mensagem = 'Em breve adicionaremos este conteúdo : )'/>);
        }

        return ( 
            
            <React.Fragment>
                <Card mensagem = {this.props.match.params.topico}/> 

                {conteudo.map((cont)=>
                <React.Fragment>
                <ContentCard  
                onSubmit = {this.handleSubmit}
                onChange = {this.handleChange}
                concluded = {this.state.concluded[conteudo.indexOf(cont)]} 
                class = {this.state.counter>=conteudo.indexOf(cont)?"cardShow":"cardHide"}
                key = {conteudo.indexOf(cont)} 
                mensagem = {cont} 
                id = {conteudo.indexOf(cont)}/>

                <MessageCard
                class = {this.state.counter===conteudo.indexOf(cont) && this.state.error?"messageCardShow":"cardHide"}
                mensagem = 'tente outra vez'
               />
               </React.Fragment>
                )}

            </React.Fragment>
        )

    }
}
 
export default Conteudo;