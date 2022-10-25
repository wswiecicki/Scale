import {Image} from "native-base";
import {images} from "../imports";
import themeColors from "../styles/theme";
import React from "react";

export const secondsToMinutes = (sec) => {
    const mins = ~~((sec % 3600) / 60);
    const secs = ~~sec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const renderIconSwitch = (type, size = 8) => {
    switch (type) {
        case 'bloom':
            return <Image key={type} source={images.bloom} size={size} tintColor={themeColors.darkBlue} alt='bloom'/>;
        case 'swirl':
            return <Image key={type} source={images.swirl} size={size} tintColor={themeColors.darkBlue} alt='swirl'/>;
        case 'wait':
        case 'start':
            return <Image key={type} source={images.wait} size={size} tintColor={themeColors.darkBlue} alt='wait'/>;
        case 'pour':
            return <Image key={type} source={images.pour} size={size} tintColor={themeColors.darkBlue} alt='pour'/>;
        case 'stir':
            return <Image key={type} source={images.stir} size={size} tintColor={themeColors.darkBlue} alt='stir'/>
        case 'end':
            return <Image key={type} source={images.coffee} size={size} tintColor={themeColors.darkBlue} alt='stir'/>
    }
}

export const descriptionSwitch = (type, details) => {
    switch (type) {
        case 'bloom':
            return 'Pour water slowly';
        case 'swirl':
            return 'Give it a gentle swirl';
        case 'wait':
            return 'Let it brew for a few seconds';
        case 'start':
            return 'Get ready...';
        case 'pour':
            return `Pour water ${details}`;
        case 'stir':
            return `Give it a stir - ${details}`;
        case 'end':
            return `You're done! Adjust the grind to achieve the correct drawdown.`;
    }
}

export const initialStep = {
    name: 'start',
    time: 3,
    coffee: 0,
    water: 0,
    description: '',
    id: 'initial'
};
export const finalStep = {
    name: 'end',
    time: 0,
    coffee: 0,
    water: 0,
    description: '',
    id: 'final'
}