let counter = 0;

export function carrosselNext(){

    /*let circle  = document.getElementById("item"+(counter+1));

    circle.className = "far fa-circle";*/

    const images = document.querySelectorAll('.carrosselSlider img');
    const slider = document.querySelector('.carrosselSlider');
    
    const size = images[0].clientWidth;

    if(counter >= images.length-1)
            counter = images.length-1;
    else{
        counter++;
    }

    /*circle  = document.getElementById("item"+(counter+1));
        circle.className = "fas fa-circle";*/

    slider.style.transform = 'translateX('+(-size*counter)+'px)';
    slider.style.transition = 'transform 0.4s ease-in-out';


}


export function carrosselPrevious(){

   /* let circle1  = document.getElementById("item"+(counter+1));

    circle1.className = "far fa-circle";*/

    const images = document.querySelectorAll('.carrosselSlider img');
    const slider = document.querySelector('.carrosselSlider');
    
    const size = images[0].clientWidth;

    if(counter <= 0)
            counter = 0;
    else{
        counter--;
    }

    /*circle1  = document.getElementById("item"+(counter+1));

    circle1.className = "fas fa-circle";*/

    slider.style.transform = 'translateX('+(-size*counter)+'px)';
    slider.style.transition = 'transform 0.4s ease-in-out';

}





