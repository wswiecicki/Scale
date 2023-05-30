import React, {useContext, useEffect, useState} from 'react';
import themeColors from "./theme";
import {useColorMode} from "native-base";

const ThemeContext = React.createContext(undefined);

export const ThemeProvider = ({children}) => {
    const {colorMode} = useColorMode();
    const [isLightTheme, setIsLightTheme] = useState(colorMode === 'light');

    useEffect(() => {
        setIsLightTheme(colorMode === 'light');
    }, [colorMode])

    const theme = {
        colors: isLightTheme ? themeColors.light : themeColors.dark,
        setTheme: (theme) => setIsLightTheme(theme === 'light')
    };

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext)
}