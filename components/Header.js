import {Box, HStack, Icon, IconButton, Image, StatusBar, Text} from "native-base";
import themeColors from "../styles/theme";
import { images } from "../imports"
import {Spacer} from "native-base/src/components/primitives/Flex";

const Header = (colorMode) => {
    return <>
        <Box w="100%" h={"160px"} paddingTop={'30px'} alignItems={'center'} justifyContent={'center'} position={'absolute'} top={0}>
            <Image source={images.Logo} borderRadius={12} h="50%" alt="logo" style={{ aspectRatio: 892/121}} />
        </Box>
    </>
}

export default Header;