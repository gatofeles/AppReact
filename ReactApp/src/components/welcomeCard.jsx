import React from 'react';
import images from '../static/utils/images';

const WelcomeCard = (props) => {

    return (

        <div id = "happy">
            <div id = "together">
                <div className="box sb1"> Que tal um tour pelo App? </div>
                <img id = "welcome" src = {images['welcome']}/>
            </div>
            <span className = "card"> Aproveite as funcionalidades ao máximo! </span>
        </div>
    );

}

export default WelcomeCard;