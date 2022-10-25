import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Svg, {Path, LinearGradient, Stop, Defs, Rect} from 'react-native-svg';
import Constants from 'expo-constants';
import {useCountdown} from 'react-native-countdown-circle-timer'
import themeColors from "../styles/theme";

function CustomProgressBar(props) {
    const {duration, weight, totalWeight} = props;

    const {
        pathLength,
        stroke,
        strokeDashoffset,
        elapsedTime,
        size,
    } = useCountdown(props)

    return (
        <View style={styles.container}>
            <View style={{width: '100%', height: 60}}>
                <Svg flex={1} height={size} width='100%'>
                    <Rect
                        rx={8}
                        width={'100%'}
                        height="20"
                        fill={themeColors.pink}
                    />
                    {elapsedTime !== duration && (
                        <Rect
                            width={`${strokeDashoffset / pathLength * 100 > 2 ? strokeDashoffset / pathLength * 100 : 0}%`}
                            fill={stroke}
                            height="20"
                            rx={8}
                        />
                    )}
                </Svg>
                <View style={styles.time}>
                    <Text style={{
                        fontSize: 20, fontFamily: 'Montserrat_600SemiBold',
                        color: themeColors.darkBlue, alignSelf: 'center'
                    }}>{Math.round(strokeDashoffset / pathLength * weight) + totalWeight}ml</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
    },
    time: {
        justifyContent: 'flex-end',
        flexDirection: 'column',
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingBottom: 0
    }
});

export default CustomProgressBar;