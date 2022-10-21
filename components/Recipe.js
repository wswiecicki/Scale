import {
    Box,
    Center,
    ChevronRightIcon,
    Image,
    PlayIcon,
    Pressable,
    Row,
    Text,
    useStyledSystemPropsResolver,
    View
} from "native-base";
import Timer from "./Timer";
import React, {useEffect, useState} from "react";
import themeColors from "../styles/theme";
import {images} from "../imports";
import {Ionicons} from '@expo/vector-icons';
import {renderIconSwitch, secondsToMinutes} from "../backend/utils";
import StyledText from "./StyledText";
import {CountdownCircleTimer} from "react-native-countdown-circle-timer";
import MaskedView from "@react-native-masked-view/masked-view";
import {LinearGradient} from "expo-linear-gradient";
import {Platform} from "react-native";
import StepList from "./StepList";


const Recipe = (props) => {
    const recipe = JSON.parse(props.route.params.recipe);
    const initialStep = {
        name: 'initial',
        time: 3,
        coffee: 0,
        water: 0,
        description: 'Get ready!',
        id: 'initial'
    };
    const finalStep = {
        name: 'final',
        time: 0,
        coffee: 0,
        water: 0,
        description: "You're done! Adjust the grind to achieve the correct drawdown.",
        id: 'final'
    }
    const steps = [initialStep, ...recipe.steps, finalStep];

    const [key, setKey] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const getStepProp = (prop) => {
        if (key > steps.length - 1) {
            return steps[steps.length - 1][prop];
        }
        return steps[key][prop];
    }

    return <View flex={1} bgColor={themeColors.white}>
        <Row pt={8} px={8} space={2}>
            <Center flex={4}>
                <CountdownCircleTimer
                    strokeWidth={16}
                    key={key}
                    size={128}
                    isPlaying={isPlaying}
                    duration={getStepProp('time')}
                    trailColor={themeColors.pink}
                    colors={[themeColors.darkBlue, themeColors.pink]}
                    colorsTime={[10, 0]}
                    onComplete={() => {
                        setKey(key + 1);
                    }}
                >
                    {({remainingTime}) => <StyledText fontSize={18}>{secondsToMinutes(remainingTime)}</StyledText>}
                </CountdownCircleTimer>
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
                    onPress={() => setKey(prevKey => prevKey + 1)}
                >
                    <Ionicons name="play-forward-circle"
                              size={48}
                              color={themeColors.pink}/>
                </Pressable>
            </Box>
        </Row>
        <Box p={4}>
            <Row px={4} borderWidth={8} borderColor={themeColors.pink} borderRadius={16}>
                <Row py={4} flex={1}>
                    <Center flex={1}>
                        {renderIconSwitch(getStepProp('name'), 20)}
                    </Center>
                    <Center flex={3}>
                        <StyledText fontSize={22}>{getStepProp('name')}</StyledText>
                        <StyledText>{getStepProp('description')}</StyledText>
                    </Center>
                </Row>
            </Row>
        </Box>

        <MaskedView flex={1} maskElement={
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

export default Recipe;