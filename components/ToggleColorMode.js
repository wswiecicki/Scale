import {Switch, useColorMode, HStack} from "native-base";
import React from "react";
import {Entypo, Fontisto} from '@expo/vector-icons';
import {useTheme} from "../styles/ThemeProvider";

export const ToggleDarkMode = () => {
    const theme = useTheme();
    const themeColors = theme.colors;
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <HStack space={2} alignItems="center">
            <Entypo name="moon" size={24} color={themeColors.secondaryBackground}/>
            <Switch
                mx={4}
                offTrackColor={themeColors.tertiarySecond}
                onTrackColor={themeColors.secondaryBackground}
                isChecked={colorMode === "light"}
                onToggle={() => {
                    toggleColorMode();
                    theme.setTheme(colorMode === 'light' ? 'dark' : 'light');
                }}
                size={"lg"}
            />
            <Fontisto name="day-sunny" size={24} color={themeColors.secondaryBackground}/>
        </HStack>
    );
}