import {Box, Image} from "native-base";
import {images} from "../imports"

const Header = () => {
    return <>
        <Box alignItems={'center'} justifyContent={'center'}>
            <Image source={images.Logo} borderRadius={12} h={'40px'} alt="logo" style={{aspectRatio: 892 / 121}}/>
        </Box>
    </>
}

export default Header;