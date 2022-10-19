import {
    Box,
    Button,
    Center, Column,
    FavouriteIcon,
    Heading,
    PlayIcon,
    Pressable,
    Row,
    ScrollView,
    Text,
    View
} from "native-base";
import React, {useEffect, useState} from "react";
import {recipeGenerator} from "../backend/mocker";
import themeColors from "../styles/theme";
import StyledText from "./StyledText";
import StyledHeading from "./StyledHeading";
import Spinner from 'react-native-loading-spinner-overlay';
import {Spacer} from "native-base/src/components/primitives/Flex";
import StepList from "./StepList";
import {FlatList, SafeAreaView} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import BoldedText from "./BoldedText";


const addToFavourites = (title, parent, favourite) => {
    favourite ? alert(title + ' ' + parent + ' is not your favourite anymore')
        : alert(title + ' ' + parent + ' is your favourite now')
}

const RecipeDetails = (props) => {
    const {title, parent} = props.route.params;
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        recipeGenerator(title, parent).then(res => {
            setData(res);
            setLoading(false);
            props.navigation.setOptions({
                headerRight: () => (
                    <FavouriteIcon size={6}
                                   color={res.favourite ? themeColors.darkBlue : themeColors.pink}
                                   onPress={() => addToFavourites(title, parent, res.favourite)}/>
                ),
            });
        });
    }, [props.navigation]);

    const totalCount = (prop) => {
        return data ?
            data.steps.map(item => item[prop]).reduce((p, n) => p + n)
            : 0;
    }

    const secondsToMinutes = (sec) => {
        const mins = ~~((sec % 3600) / 60);
        const secs = ~~sec % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    return <View flex={1.5} bgColor={themeColors.white}>
        <Spinner
            visible={isLoading}
        />
        <Center>
            <StyledHeading py={8}>{title + ' - ' + parent}</StyledHeading>
            <Row px={8} pb={2} space={2}>
                <Box flex={1} p={5} borderColor={themeColors.darkBlue} borderWidth={1} borderRadius={16}
                     alignItems={'center'}>
                    <BoldedText fontSize={16}>Total water:</BoldedText>
                    <StyledText paddingBottom={4}>{totalCount('water')}ml</StyledText>
                    <BoldedText fontSize={16}>Temperature:</BoldedText>
                    <StyledText>{data ? data.waterTemp : 0}°C</StyledText>

                </Box>
                <Box flex={1} p={5} borderColor={themeColors.darkBlue} borderWidth={1} borderRadius={16}
                     alignItems={'center'}>
                    <BoldedText fontSize={16}>Total coffee:</BoldedText>
                    <StyledText paddingBottom={4}>{totalCount('coffee')}g</StyledText>
                    <BoldedText fontSize={16}>Coffee grind:</BoldedText>
                    <StyledText>{data ? data.grind : "loading"}</StyledText>
                </Box>
            </Row>
            <Row px={8} pb={2} space={2}>
                <Box borderColor={themeColors.pink} flex={3} borderWidth={1} borderRadius={8}
                     alignItems={'center'}>
                    <StyledText p={3}>{data?.description}</StyledText>
                </Box>
                <Box borderColor={themeColors.pink} flex={1} p={2} borderWidth={1} borderRadius={8}
                     alignItems={'center'} justifyContent={'center'} bg={themeColors.darkBlue}>
                    <PlayIcon size={16} color={themeColors.pink}/>
                </Box>
            </Row>
            <Row px={8} pb={2} space={2}>
                <Box borderColor={themeColors.pink} flex={3} borderWidth={1} borderRadius={8}
                     alignItems={'center'} justifyContent={'center'} bg={themeColors.pink}>
                    <BoldedText fontSize={16} p={2}>Expected time:</BoldedText>
                </Box>
                <Box borderColor={themeColors.pink} flex={1} p={2} borderWidth={1} borderRadius={8}
                     alignItems={'center'} justifyContent={'center'} bg={themeColors.pink}>
                    <StyledText>{secondsToMinutes(totalCount('time'))}</StyledText>
                </Box>
            </Row>


            <Row px={8} pb={2} space={2}>
                <Box borderColor={'transparent'} flex={1} borderWidth={1}
                     borderBottomColor={themeColors.pink}
                     borderTopColor={themeColors.pink}
                     alignItems={'center'} justifyContent={'center'}>
                    <BoldedText p={1} fontSize={16}>Steps</BoldedText>
                </Box>
            </Row>
        </Center>

        <MaskedView flex={1} maskElement={
            <LinearGradient
                colors={['rgb(237,237,237)', 'transparent']}
                style={{width: '100%', height: '100%', zIndex: 1}}
                start={{x: 0, y: 0.8}}
            />
        }>
            <StepList steps={data ? data.steps : []}/>
        </MaskedView>

    </View>
}


export default RecipeDetails;