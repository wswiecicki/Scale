import {HStack, Switch, Text, useColorMode} from "native-base";
import React from "react";
import themeColors from "../styles/theme";

function ToggleDarkMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <HStack space={2} alignItems="center">
            <Text>Dark</Text>
            <Switch
                isChecked={colorMode === "light"}
                onToggle={toggleColorMode}
                offTrackColor={themeColors.pink}
                onTrackColor={themeColors.pink}
                onThumbColor={themeColors.white}
                offThumbColor={themeColors.white}
                aria-label={
                    colorMode === "light" ? "switch to dark mode" : "switch to light mode"
                }
            />
            <Text>Light</Text>
        </HStack>
    );
}

export default ToggleDarkMode;