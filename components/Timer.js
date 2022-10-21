import {CountdownCircleTimer} from 'react-native-countdown-circle-timer'
import {Text} from "native-base";
import themeColors from "../styles/theme";
import StyledText from "./StyledText";
import {secondsToMinutes} from "../backend/utils";

const Timer = ({key, isPlaying, duration, onComplete}) => {
    return <CountdownCircleTimer
        strokeWidth={4}
        size={128}
        isPlaying={isPlaying}
        duration={duration}
        trailColor={themeColors.pink}
        colors={[themeColors.darkBlue, themeColors.pink]}
        colorsTime={[duration, 0]}
        onComplete={onComplete}
    >
        {({remainingTime}) => <StyledText fontSize={18}>{secondsToMinutes(remainingTime)}</StyledText>}
    </CountdownCircleTimer>
}

export default Timer;