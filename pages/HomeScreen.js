import {Button, Center, Column, Row} from "native-base";
import themeColors from "../styles/theme";
import Tile from "../components/Tile";
import React from "react";

const HomeScreen = ({navigation}) => {
    return <>
        <Center _dark={{bg: themeColors.darkBlue}} _light={{bg: themeColors.white}} flex={1}>
            <Column space={5} alignItems="center">
                <Row space={4} paddingBottom={32}>
                    <Tile text='Espresso' navigation={navigation}/>
                    <Tile text='V60' navigation={navigation}/>
                </Row>
                <Button
                    onPress={() => navigation.navigate('BLE')}
                    size={32}>Bluetooth</Button>
            </Column>
        </Center>
    </>
}

export default HomeScreen;