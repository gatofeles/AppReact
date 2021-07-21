import React from 'react';


const Card = (props) => {

    return (

        <div className = "card">
            {props.mensagem}
        </div>
    );

}

export default Card;