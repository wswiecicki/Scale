import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Svg, {Path, LinearGradient, Stop, Defs, Rect} from 'react-native-svg';
import Constants from 'expo-constants';
import {useCountdown} from 'react-native-countdown-circle-timer'
import themeColors from "../styles/theme";
import {Box, Column, Row} from "native-base";
import {useBLEStore} from "../App";
import StyledText from "./StyledText";
import {FontAwesome} from '@expo/vector-icons';


function UserProgressShower(props) {
    const {duration, weight, totalWeight, size} = props;

    const userWeight = useBLEStore((state) => state.weight);

    // const {
    //     pathLength,
    //     stroke,
    //     strokeDashoffset,
    //     elapsedTime,
    //     size,
    // } = useCountdown(props)

    return (
        <View style={{width: '100%', height: 60}}>
            <Svg flex={1} height={size} width='100%'>
                <Rect
                    rx={8}
                    width={'100%'}
                    height="20"
                    fill={themeColors.pinkishBlue}
                />

                <Rect
                    width={`${((userWeight / 255) * 100) > 3 ? (userWeight / 255) * 100 : 0}%`}
                    fill={themeColors.darkBlue}
                    height="20"
                    rx={8}
                />

            </Svg>

            <View style={styles.time}>
                <Row>
                    <Box flex={1}>
                    </Box>
                    <Box flex={1}>
                        <Text style={{
                            fontSize: 20, fontFamily: 'Montserrat_600SemiBold',
                            color: themeColors.darkBlue, alignSelf: 'center'
                        }}>{Math.round(userWeight)}ml</Text>
                    </Box>
                    <Row flex={1} alignItems={'center'} justifyContent={'flex-end'}>
                        <FontAwesome name="balance-scale" size={18} color={themeColors.darkBlue}/>
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