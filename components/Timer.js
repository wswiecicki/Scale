import {CountdownCircleTimer} from 'react-native-countdown-circle-timer'
import {Box, Progress, Text} from "native-base";
import themeColors from "../styles/theme";
import StyledText from "./StyledText";
import {secondsToMinutes} from "../backend/utils";
import React from "react";

const Timer = ({isPlaying, stepTime, onComplete}) => {
    return <CountdownCircleTimer
        updateInterval={0}
        strokeWidth={16}
        size={128}
        isPlaying={isPlaying}
        duration={stepTime}
        trailColor={themeColors.pink}
        colors={[themeColors.darkBlue, themeColors.pink]}
        colorsTime={[10, 0]}
        onComplete={onComplete}
    >
        {({remainingTime, elapsedTime}) => {
            return <>
                <StyledText fontSize={20}>{secondsToMinutes(remainingTime)}</StyledText>

            </>
        }}
    </CountdownCircleTimer>
}


export default React.memo(Timer, (p1, p2) => p1.isPlaying === p2.isPlaying);