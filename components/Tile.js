import React, {useState} from "react";
import {Dimensions, Pressable} from "react-native";
import {Box, Image, Text} from "native-base";
import {images} from "../imports";
import themeColors from "../styles/theme";

const Tile = ({text, navigation, path}) => {
    if (!path) path = text;

    const [isPressed, setPressed] = useState(false);

    const handlePress = () => {
        setPressed(true);
        navigation.navigate(path, {name: text})
    }
    return <Pressable onPress={handlePress} onPressOut={() => setPressed(false)}>
        <Box
            bg={isPressed ? themeColors.pink : themeColors.blue}
            style={{
                transform: [{
                    scale: isPressed ? 0.96 : 1
                }]
            }}
            shadow={3}
            p={3}
            rounded="md"
            width={Dimensions.get('window').width / 3}
            height={Dimensions.get('window').width / 3}
            alignItems='center'
            justifyContent='center'>
            <>
                <Image tintColor={themeColors.white} source={images[text]} alt={text} width={'75%'} height={'75%'}/>
                <Text color={themeColors.white}>{text}</Text>
            </>
        </Box>
    </Pressable>
}

export default Tile;