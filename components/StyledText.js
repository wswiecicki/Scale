import {Text} from "native-base";
import themeColors from "../styles/theme";

const StyledText = (props) => {
    return (
        <Text style={{
            fontFamily: 'Montserrat_400Regular',
            color: themeColors.darkBlue
        }} {...props} >{props.children}</Text>
    )
}

export default StyledText;