import {Box, Column, Image, Pressable, Row, ScrollView, Text, View} from "native-base";
import {FlatList} from "react-native";
import StyledText from "./StyledText";
import React from "react";
import {LinearGradient} from 'expo-linear-gradient';
import {images} from "../imports";
import {renderIconSwitch} from "../backend/utils";
import {useTheme} from "../styles/ThemeProvider";


const StepList = (steps, props) => {
    const themeColors = useTheme().colors;

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
                        borderColor: themeColors.secondaryFirst,
                        borderRadius: 10,
                        marginVertical: 8
                    }}>
                    <Row alignItems={'center'}>
                        <Box flex={3}>{renderIconSwitch(item.name, themeColors)}</Box>
                        <StyledText px={3} flex={8}>{item.name}</StyledText>

                        <Box flex={1}><Image source={images.clock} size={5} tintColor={themeColors.secondaryFirst}
                                             alt='wait'/></Box>
                        <StyledText pl={2} flex={2}>{item.time}s</StyledText>
                    </Row>

                </Pressable>
            }}/>

    </Column>
}

export default StepList;