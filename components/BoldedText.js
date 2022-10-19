import {Text} from "native-base";
import themeColors from "../styles/theme";

const BoldedText = (props) => {
    return (
        <Text style={{
            fontFamily: 'Montserrat_600SemiBold',
            color: themeColors.darkBlue
        }} {...props} >{props.children}</Text>
    )
}

export default BoldedText;