function display(event) {
    let X = event.clientX;
    let Y = event.clientY;
    let X_rapport = X / window.innerWidth;
    let Y_rapport = Y / window.innerHeight;
    let vol2 = -(Math.pow(X_rapport-0.5, 2)+Math.pow(Y_rapport-0.5,2))*4+1;
    let result = document.getElementById("result");
    result.innerHTML = "<b>X-coordinate: </b>" + X_rapport;
    let resultY = document.getElementById("resultY");
    resultY.innerHTML = "<b>Y-coordinate: </b>" + Y_rapport;
    let vol = Math.cos((Y_rapport-0.5)*3.15);
    let volY = document.getElementById("volY");
    volY.innerHTML = "<B>volCos: </b>" + vol2;
 }


 document.addEventListener('DOMContentLoaded', function() {
    var sound = new Howl({
      src: ['../music/DarkSouls3-Premonition.mp3'],
      //src: ['../music/Miles-Davis-SoWhat.mp3'],
      //src : ["../music/desole.mp3"],
      loop: true,
    });
  
    window.addEventListener('mousemove', function(event) {
      var y = event.clientY / (window.innerHeight); 
      var x = event.clientX / window.innerWidth; 
      var vol = -(Math.pow(y-0.5, 2)+Math.pow(x-0.5,2))*4+1;
      sound.volume(vol); 
      var stereo = (x-0.5)*2; 
      //sound.stereo(stereo); 
    });
  
    sound.play();
  });


















/*import { useEffect } from "react";
import { Howl } from "howler";
import mySound from "./music/trumpet-lofi-141049.mp3"; // our fictitious audio file, replace this with whatever sound you want to play


const getStereoBias = (mouseX) => {
    const w = component.clientWidth; // grab the component's width
    const bias = -((Math.round(w / 2) - mouseX) / w) * 2; // calculate a value of -1 to 1 based on the cursor position within the component
    return bias;
};


const handleClick = (event) => {
    const stereoBias = getStereoBias(event.clientX); //  calculate the "position" of the sound's origin

    const sound = new Howl({ src: mySound, stereo: stereoBias }); // instantiate a new Howl here, passing it the path to our sound effect and stereo bias "position"
    sound.play(); //  as soon as the object is created, we can play the sound effect
  };




const MyComponent = () => {
  let component;

  useEffect(() => {
    const handleClick = (e) => {
      const sound = new Howl({ src: mySound }); // instantiate a new Howl here, passing it the path to our sound effect
      sound.play(); //  as soon as the object is created, we can play the sound effect
    };

    component && component.addEventListener("click", handleClick); //  once the component has been rendered and saved to a variable, add the EventListener

    return () => {
      component && component.removeEventListener("click", handleClick); //  if the component is removed, remove the EventListener
    };
  }, [component]);

  return (
    <div
      style={{ width: "100vw", height: "100vh" }} //  adding the styling ensures that our component will cover the entire viewport
      ref={(el) => (component = el)} // save the rendered element to a ref variable we can manipulate
    />
  );
};

export default MyComponent;
*/
