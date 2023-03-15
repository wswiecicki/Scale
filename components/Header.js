import {Box, Center, Image, View} from "native-base";
import {images} from "../imports"
import {useTheme} from "../styles/ThemeProvider";

const Header = ({tall, props}) => {
    const themeColors = useTheme().colors;

    return <>
        <View py={tall ? '16' : null}>
            <Image source={images.Logo} alt="logo"
                   style={{aspectRatio: 1067 / 120, height: tall ? 40 : 24}}/>
        </View>
    </>
}

export default Header;