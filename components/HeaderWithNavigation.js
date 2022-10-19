import {
    ArrowBackIcon,
    Box,
    Center,
    Column,
    createIcon,
    FavouriteIcon,
    Image,
    InfoOutlineIcon,
    MoonIcon,
    Pressable,
    Row,
    Text
} from "native-base";
import {images} from "../imports"
import themeColors from "../styles/theme";
import {useNavigation} from "@react-navigation/native";

const HeaderWithNavigation = () => {
    const navigation = useNavigation();

    return <>
        <Box
            w="100%"
            h={"150px"}
            paddingTop={'30px'}
            alignItems={'center'}
            justifyContent={'center'}
            position={'absolute'}
            top={'20px'}>
            <Row alignItems={'center'}>
                <Pressable paddingLeft={3} onPress={() => navigation.navigate('Home')}><ArrowBackIcon size={6} /></Pressable>
                <Image source={images.Logo} borderRadius={12} h="50%" alt="logo" style={{aspectRatio: 892 / 121}}/>
            </Row>

            <Row
                w='100%'
                marginTop='20px'
                flex={1}
                justifyContent={'space-between'}
                alignItems={'center'}
                space='2'
            >
                <IconWrapper direction='Roasters'>
                    <Image tintColor={themeColors.white} source={images.roaster_icon} size={8} alt={'roaster'}/>
                    <Text paddingBottom={3} color={themeColors.white}>Roasters</Text>
                </IconWrapper>
                <IconWrapper direction='YourOwn'>
                    <Image tintColor={themeColors.white} source={images.user_icon} size={8} alt={'your own'}/>
                    <Text paddingBottom={3} color={themeColors.white}>Your own</Text>
                </IconWrapper>
                <IconWrapper direction='Favourites'>
                    <FavouriteIcon color={themeColors.white} size={8}/>
                    <Text paddingBottom={3} color={themeColors.white}>Favourites</Text>
                </IconWrapper>
            </Row>
        </Box>

    </>
}

const IconWrapper = (props) => {
    const {direction, children} = props;
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate(direction);
    }
    return <Box bg={themeColors.blue} flexGrow={1} borderWidth={1} borderRadius={10} borderColor={themeColors.darkBlue}>
        <Pressable onPress={handlePress} >
            <Center padding={6}>
                {children}
            </Center>
        </Pressable>
    </Box>
}



export default HeaderWithNavigation;