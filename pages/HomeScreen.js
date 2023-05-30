import {Button, Center, Column, Row} from "native-base";
import Tile from "../components/Tile";
import React from "react";
import {Dimensions} from "react-native";
import {ToggleDarkMode} from "../components/ToggleColorMode";
import {useTheme} from "../styles/ThemeProvider";


const HomeScreen = ({navigation}) => {
    const themeColors = useTheme().colors;
    return <>
        <Center bg={themeColors.primaryFirst} flex={1}>
            <Column space={5} alignItems="center">
                <Row space={4}>
                    <Tile text='V60' navigation={navigation} size={Dimensions.get('window').width / 3}/>
                </Row>

                <Row pt={6}>
                    <Tile text={'Bluetooth'} navigation={navigation} path='BLE'
                          size={Dimensions.get('window').width / 4}/>
                </Row>
                <Row pt={6}>
                    <ToggleDarkMode/>
                </Row>
            </Column>
        </Center>
    </>
}

export default HomeScreen;