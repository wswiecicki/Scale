import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Rect} from 'react-native-svg';
import {useCountdown} from 'react-native-countdown-circle-timer'
import themeColors from "../styles/theme";
import {Box, Row} from "native-base";
import {Ionicons} from '@expo/vector-icons';
import StyledText from "./StyledText";

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
                <Row>
                    <Box flex={1}/>
                    <Row>
                        <Text style={{
                            fontSize: 20, fontFamily: 'Montserrat_600SemiBold',
                            color: themeColors.darkBlue, alignSelf: 'center'
                        }}>{Math.round(strokeDashoffset / pathLength * weight) + totalWeight}ml</Text>
                    </Row>
                    <Row flex={1} alignItems={'center'} justifyContent={'flex-end'}>
                        <Ionicons name="ios-water-outline" size={18} color={themeColors.darkBlue}/>
                        <StyledText>Recipe</StyledText>
                    </Row>
                </Row>
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