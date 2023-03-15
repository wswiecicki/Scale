import {Text} from "native-base";
import {useTheme} from "../styles/ThemeProvider";

const BoldedText = (props) => {
    const themeColors = useTheme().colors;

    return (
        <Text style={{
            fontFamily: 'Montserrat_600SemiBold',
            color: themeColors.secondaryFirst
        }} {...props} >{props.children}</Text>
    )
}

export default BoldedText;