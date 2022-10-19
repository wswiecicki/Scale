import {Heading, Text} from "native-base";
import {Montserrat_600SemiBold} from "@expo-google-fonts/montserrat";

const StyledHeading = (props) => {
    return (
        <Text style={{
            fontFamily: 'Montserrat_800ExtraBold',
            fontSize: 24
        }} {...props} >{props.children}</Text>
    )
}

export default StyledHeading;