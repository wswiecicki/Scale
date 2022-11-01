import {Button, Center, Column, Row} from "native-base";
import themeColors from "../styles/theme";
import Tile from "../components/Tile";
import React from "react";
import {Dimensions} from "react-native";

const HomeScreen = ({navigation}) => {
    return <>
        <Center _dark={{bg: themeColors.darkBlue}} _light={{bg: themeColors.white}} flex={1}>
            <Column space={5} alignItems="center">
                <Row space={4}>
                    <Tile text='Espresso' navigation={navigation} size={Dimensions.get('window').width / 3}/>
                    <Tile text='V60' navigation={navigation} size={Dimensions.get('window').width / 3}/>
                </Row>

                <Row pt={6}>
                    <Tile text={'Bluetooth'} navigation={navigation} path='BLE'
                          size={Dimensions.get('window').width / 4}/>
                </Row>
            </Column>
        </Center>
    </>
}

export default HomeScreen;