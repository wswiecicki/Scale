import React, {useState} from "react";
import {Dimensions, Pressable} from "react-native";
import {Box, Image, Text} from "native-base";
import {images} from "../imports";
import {useTheme} from "../styles/ThemeProvider";

const Tile = ({text, navigation, path, size}) => {
    const themeColors = useTheme().colors;
    if (!path) path = text;

    const [isPressed, setPressed] = useState(false);

    const handlePress = () => {
        setPressed(true);
        navigation.navigate(path, {name: text})
    }
    return <Pressable onPress={handlePress} onPressOut={() => setPressed(false)}>
        <Box
            bg={isPressed ? themeColors.tertiarySecond : themeColors.secondaryBackground}
            style={{
                transform: [{
                    scale: isPressed ? 0.96 : 1
                }]
            }}
            shadow={3}
            p={3}
            rounded="md"
            width={size}
            height={size}
            alignItems='center'
            justifyContent='center'>
            <>
                <Image tintColor={themeColors.primaryFirst} source={images[text]} alt={text} width={'75%'}
                       height={'75%'}/>
                <Text color={themeColors.primaryFirst} fontFamily={'Montserrat_400Regular'}>{text}</Text>
            </>
        </Box>
    </Pressable>
}

export default Tile;