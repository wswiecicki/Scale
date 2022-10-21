import {Image} from "native-base";
import {images} from "../imports";
import themeColors from "../styles/theme";
import React from "react";

export const secondsToMinutes = (sec) => {
    const mins = ~~((sec % 3600) / 60);
    const secs = ~~sec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}


export const renderIconSwitch = (type, size = 8) => {
    switch (type) {
        case 'bloom':
            return <Image key={type} source={images.bloom} size={size} tintColor={themeColors.darkBlue} alt='bloom'/>;
        case 'swirl':
            return <Image key={type} source={images.swirl} size={size} tintColor={themeColors.darkBlue} alt='swirl'/>;
        case 'wait':
        case 'initial':
            return <Image key={type} source={images.wait} size={size} tintColor={themeColors.darkBlue} alt='wait'/>;
        case 'pour':
            return <Image key={type} source={images.pour} size={size} tintColor={themeColors.darkBlue} alt='pour'/>;
        case 'stir':
            return <Image key={type} source={images.stir} size={size} tintColor={themeColors.darkBlue} alt='stir'/>
        case 'final':
            return <Image key={type} source={images.coffee} size={size} tintColor={themeColors.darkBlue} alt='stir'/>
    }
}