import {Box, Center, Column, Pressable, Row, Text, View} from "native-base";
import React, {useRef, useState} from "react";
import themeColors from "../styles/theme";
import {Ionicons} from '@expo/vector-icons';
import {capitalize, descriptionSwitch, finalStep, initialStep, renderIconSwitch} from "../backend/utils";
import StyledText from "./StyledText";
import MaskedView from "@react-native-masked-view/masked-view";
import {LinearGradient} from "expo-linear-gradient";
import {Animated, Dimensions, Platform, StyleSheet} from "react-native";
import StepList from "./StepList";
import Timer from "./Timer";
import CustomProgressBar from "./CustomProgressBar";
import UserProgressShower from "./UserProgressShower";
import {useBLEStore} from "../App";


const Recipe = (props) => {
    const recipe = JSON.parse(props.route.params.recipe);

    const steps = [initialStep, ...recipe, finalStep];
    const [totalWater, setTotalWater] = useState(0);
    const [key, setKey] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const deviceConnected = useBLEStore((state) => state.deviceConnected);


    const getStepProp = (prop) => {
        if (key > steps.length - 1) {
            return steps[steps.length - 1][prop];
        }
        return steps[key][prop];
    }


    return <View flex={1} bgColor={themeColors.white}>
        <Row pt={8} px={8} space={2}>
            <Center flex={4}>
                <Timer
                    key={key}
                    isPlaying={isPlaying}
                    stepTime={getStepProp('time')}
                    onComplete={() => {
                        setKey(key + 1);
                        setTotalWater(getStepProp('water') + totalWater);
                    }}
                />

            </Center>
            <Box flex={3} py={4}>
                <Pressable
                    flex={1}
                    borderRadius={24}
                    alignItems={'center'}
                    justifyContent={'center'}
                    bg={themeColors.darkBlue}
                    onPress={() => setIsPlaying(!isPlaying)}
                >
                    {isPlaying ? (<Ionicons name="pause-circle" size={64} color={themeColors.pink}/>)
                        : (<Ionicons name="play-circle" size={64} color={themeColors.pink}/>)}
                </Pressable>
            </Box>
            <Box flex={2} py={7}>
                <Pressable
                    flex={1}
                    borderRadius={24}
                    alignItems={'center'}
                    justifyContent={'center'}
                    bg={themeColors.darkBlue}
                    onPress={() => {
                        setKey(prevKey => prevKey + 1);
                        setTotalWater(getStepProp('water') + totalWater);

                    }}
                >
                    <Ionicons name="play-forward-circle"
                              size={48}
                              color={themeColors.pink}/>
                </Pressable>
            </Box>
        </Row>
        <Box m={4} p={4} borderWidth={8} borderColor={themeColors.pink} borderRadius={16}>
            <Column>
                <Row px={4}>
                    <Row flex={1}>
                        <Center flex={1}>
                            {renderIconSwitch(getStepProp('name'), 16)}
                        </Center>
                        <Center flex={3}>
                            <StyledText fontSize={22}>{capitalize(getStepProp('name'))}</StyledText>
                            <StyledText>{(descriptionSwitch(getStepProp('name'), getStepProp('description')))}</StyledText>
                        </Center>
                    </Row>
                </Row>
                <Row>
                    {getStepProp('water') !== 0 &&
                        <Column flex={1} pt={4} space={4}>
                            <Box>
                                <CustomProgressBar flex={1}
                                                   size={300} key={`${key}-bar`} isPlaying={isPlaying}
                                                   duration={getStepProp('time')}
                                                   colors={[themeColors.darkBlue, themeColors.pink]}
                                                   weight={getStepProp('water')}
                                                   totalWeight={totalWater}
                                />
                            </Box>
                            {deviceConnected ? (<Box>
                                <UserProgressShower size={300}/>
                            </Box>) : null}

                        </Column>
                    }
                </Row>

            </Column>
        </Box>


        <MaskedView
            flex={1}
            maskElement={
                <LinearGradient
                    colors={['rgb(237,237,237)', 'transparent']}
                    style={{width: '100%', height: '100%', zIndex: 1}}
                    start={{x: Platform.OS === 'ios' ? 0.5 : 0, y: 0.8}}
                />
            }>
            <StepList steps={steps.slice(key + 1, -1)}/>
        </MaskedView>
    </View>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    fadingContainer: {
        paddingTop: 8,
        backgroundColor: "powderblue"
    },
    fadingText: {
        fontSize: 28
    },
    buttonRow: {
        flexBasis: 100,
        justifyContent: "space-evenly",
        marginVertical: 16
    }
});

export default Recipe;