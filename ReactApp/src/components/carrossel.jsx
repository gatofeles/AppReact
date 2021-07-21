import React, { Component } from 'react';

import images from '../static/utils/images';

class Carrossel  extends Component {


    states = {

        counter: 0,
    }

carrosselNext = () => {

    let counter = this.states.counter;

    let circle  = document.getElementById("item"+(counter+1));

    circle.className = "far fa-circle";

    const images = document.querySelectorAll('.carrosselSlider img');
    const slider = document.querySelector('.carrosselSlider');
    
    const size = images[0].clientWidth;

    if(counter >= images.length-1)
            counter = images.length-1;
    else{
        counter++;
    }

    circle  = document.getElementById("item"+(counter+1));
    circle.className = "fas fa-circle";

    slider.style.transform = 'translateX('+(-size*counter)+'px)';
    slider.style.transition = 'transform 0.4s ease-in-out';


}


carrosselPrevious = () => {

    let counter = this.states.counter;

    console.log('counter',counter);

    let circle1  = document.getElementById("item"+(counter+1));

    circle1.className = "far fa-circle";

    const images = document.querySelectorAll('.carrosselSlider img');
    const slider = document.querySelector('.carrosselSlider');
    
    const size = images[0].clientWidth;

    if(counter <= 0)
            counter = 0;
    else{
        counter--;
    }

    circle1  = document.getElementById("item"+(counter+1));

    circle1.className = "fas fa-circle";

    slider.style.transform = 'translateX('+(-size*counter)+'px)';
    slider.style.transition = 'transform 0.4s ease-in-out';

}
    
    render() { 
        return ( 
        <div className = "carrossel-conteiner">
            <span className = "Itext"> Interessante Saber! </span>
            <div className = "carrossel">
                <i id = "prev"  onClick={this.carrosselPrevious()} className="fas fa-arrow-alt-circle-left"></i>
                <i id = "next" onClick= {this.carrosselNext()} className="fas fa-arrow-alt-circle-right"></i>
                <div className = "carrosselSlider">
                    <img className = "bunny-active" src= {images['students']}/>
                    <img className = "bunny-active" src= {images['students']}/>
                    <img className = "bunny-active" src= {images['students']}/>
                </div>  
            </div>
            <div className = "circles">
                <i id = "item1" className="fas fa-circle"></i>
                <i id = "item2" className="far fa-circle"></i>
                <i id = "item3" className="far fa-circle"></i>
            </div>
        </div>

         );
    }
}
 
export default Carrossel;

