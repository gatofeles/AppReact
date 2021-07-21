import React from 'react';


const MessageCard = (props) => {

    return (

        <div className = {props.class}>
            {props.mensagem}
        </div>
    );

}

export default MessageCard;