import {Box, Column, Image, Pressable, Row, ScrollView, Text, View} from "native-base";
import {FlatList} from "react-native";
import themeColors from "../styles/theme";
import StyledText from "./StyledText";
import React from "react";
import {LinearGradient} from 'expo-linear-gradient';
import {images} from "../imports";


const StepList = (steps, props) => {
    const renderIconSwitch = (type) => {
        switch (type) {
            case 'bloom':
                return <Image source={images.bloom} size={8} tintColor={themeColors.darkBlue} alt='bloom'/>;
            case 'swirl':
                return <Image source={images.swirl} size={8} tintColor={themeColors.darkBlue} alt='swirl'/>;
            case 'wait':
                return <Image source={images.wait} size={8} tintColor={themeColors.darkBlue} alt='wait'/>;
            case 'pour':
                return <Image source={images.pour} size={8} tintColor={themeColors.darkBlue} alt='pour'/>;
            case 'stir':
                return <Image source={images.stir} size={8} tintColor={themeColors.darkBlue} alt='stir'/>
        }
    }
    return <Column px={8} flex={1}>
        <FlatList
            style={{flexGrow: 1}}
            data={steps.steps}
            keyExtractor={step => step.id}
            renderItem={({item}) => {
                return <Pressable
                    style={{
                        width: '100%',
                        padding: 20,
                        borderWidth: 1,
                        borderColor: themeColors.darkBlue,
                        borderRadius: 10,
                        marginVertical: 8
                    }}>
                    <Row alignItems={'center'}>
                        <Box flex={2}>{renderIconSwitch(item.name)}</Box>
                        <StyledText px={2} flex={8}>{item.name}</StyledText>
                        <StyledText flex={1}>{item.time}s</StyledText>
                        <Box flex={1}><Image source={images.clock} size={5} tintColor={themeColors.darkBlue}
                                             alt='wait'/></Box>
                    </Row>

                </Pressable>
            }}/>

    </Column>
}

export default StepList;