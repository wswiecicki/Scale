import {Text} from "native-base";
import {useTheme} from "../styles/ThemeProvider";

const StyledText = (props) => {
    const themeColors = useTheme().colors;

    return (
        <Text style={{
            fontFamily: 'Montserrat_400Regular',
            color: themeColors.secondaryFirst
        }} {...props} >{props.children}</Text>
    )
}

export default StyledText;