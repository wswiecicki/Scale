import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Svg, {Path, LinearGradient, Stop, Defs, Rect} from 'react-native-svg';
import Constants from 'expo-constants';
import {useCountdown} from 'react-native-countdown-circle-timer'
import {Box, Column, Row} from "native-base";
import {useBLEStore} from "../App";
import StyledText from "./StyledText";
import {FontAwesome} from '@expo/vector-icons';
import {useTheme} from "../styles/ThemeProvider";


function UserProgressShower(props) {
    const themeColors = useTheme().colors;

    const {duration, weight, totalWeight, size} = props;

    const {
        pathLength,
        stroke,
        strokeDashoffset,
        elapsedTime
    } = useCountdown(props)

    const userWeight = useBLEStore((state) => state.weight);
    const setFlowRate = useBLEStore((state) => state.setFlowRate);
    const flowRate = useBLEStore((state) => state.flowRate);


    const interpolateWeight = () => {
        const end = weight + totalWeight;
        const expected = strokeDashoffset / pathLength * 100;

        if (userWeight < totalWeight) {
            flowRate === 1 ? null : setFlowRate(1);
            return 0;
        } else if (userWeight > end) {
            flowRate === 2 ? null : setFlowRate(2);
            return 100;
        } else {
            const current = ((userWeight - totalWeight) / weight) * 100;

            if (expected - current > 5) {
                flowRate === 1 ? null : setFlowRate(1);
            } else if (expected - current < -5) {
                flowRate === 2 ? null : setFlowRate(2);
            } else {
                flowRate === 0 ? null : setFlowRate(0);
            }
            return current;
        }
    }

    const flowRateSwitch = () => {
        switch (flowRate) {
            case 0:
                return 'OK';
            case 1:
                return 'Too slow';
            case 2:
                return 'Too fast'
        }
    }

    return (
        <View style={{width: '100%', height: 60}}>
            <Svg flex={1} height={size} width='100%'>
                <Rect
                    rx={8}
                    width={'100%'}
                    height="20"
                    fill={themeColors.tertiaryFirst}
                />

                <Rect
                    width={`${interpolateWeight()}%`}

                    fill={themeColors.secondaryFirst}
                    height="20"
                    rx={8}
                />

            </Svg>

            <View style={styles.time}>
                <Row>
                    <Box flex={1}>
                        <StyledText>{flowRateSwitch()}</StyledText>
                    </Box>
                    <Box flex={1}>
                        <Text style={{
                            fontSize: 20, fontFamily: 'Montserrat_600SemiBold',
                            color: themeColors.secondaryFirst, alignSelf: 'center'
                        }}>{userWeight}ml</Text>
                    </Box>
                    <Row flex={1} alignItems={'center'} justifyContent={'flex-end'}>
                        <FontAwesome name="balance-scale" size={18} color={themeColors.secondaryFirst}/>
                        <StyledText>Scale</StyledText>
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
        paddingBottom: 0,
    }
});

export default UserProgressShower;