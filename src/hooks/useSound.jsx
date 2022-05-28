import React from 'react';
import { IMAGES } from "../assets";

const useSound = () => {
    let audio = new Audio(IMAGES.sound);
    return [() => { 
        audio.play();
    }]
}

export default useSound