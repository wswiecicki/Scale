import themeColors from "../styles/theme";
import {Box, Center, Select} from "native-base";
import StyledText from "./StyledText";
import _ from "lodash";
import React from "react";

const SelectorWrapper = ({children, text, items, selectedValue, onValueChange, placeholder}) => {
    return <>
        <Box flex={1}
             borderRadius={16}
             bgColor={themeColors.pink}
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
                borderColor={themeColors.pink}
                borderRadius={16}
                bgColor={themeColors.white}
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