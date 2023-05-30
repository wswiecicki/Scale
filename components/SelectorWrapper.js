import {Box, Center, Select} from "native-base";
import StyledText from "./StyledText";
import React from "react";
import {useTheme} from "../styles/ThemeProvider";

const SelectorWrapper = ({children, text, items, selectedValue, onValueChange, placeholder}) => {
    const themeColors = useTheme().colors;

    return <>
        <Box flex={1}
             borderRadius={16}
             bgColor={themeColors.tertiarySecond}
             alignSelf={'baseline'}>
            <Center>
                <Box
                    width='100%'
                    alignItems='center'
                    p={2}
                    borderBottomRadius={0}
                    mt={2}>
                    <StyledText fontSize={16}>{placeholder}</StyledText>
                </Box>
            </Center>
            <Select
                borderColor={themeColors.tertiarySecond}
                borderRadius={16}
                bgColor={themeColors.primaryFirst}
                fontFamily={'Montserrat_400Regular'}

                selectedValue={selectedValue}
                onValueChange={onValueChange}
                placeholder={placeholder}
            >

                {children}
            </Select>
        </Box>
    </>
}

export default SelectorWrapper;