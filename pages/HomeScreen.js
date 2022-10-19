import {Center, Column, Row} from "native-base";
import themeColors from "../styles/theme";
import Tile from "../components/Tile";
import React from "react";

const HomeScreen = ({navigation}) => {
    return <>
        <Center _dark={{bg: themeColors.darkBlue}} _light={{bg: themeColors.white}} flex={1} paddingBottom={'10%'}>
            <Column space={5} alignItems="center">
                <Row space={4}>
                    <Tile text='Espresso' navigation={navigation}/>
                    <Tile text='V60' navigation={navigation}/>
                </Row>
            </Column>
        </Center>
    </>
}

export default HomeScreen;